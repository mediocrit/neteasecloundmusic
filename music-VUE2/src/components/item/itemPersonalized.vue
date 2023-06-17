<template>
  <div class="personalized-item" @click="pushToAlbumList(albumId)">
    <div class="album-cover">
      <van-image width="100%" height="100%" :src="albumCover" />
      <span class="count">{{ changeCount(albumCount) }}</span>
      <div class="btn-active">
        <svg
          class="icon"
          aria-hidden="true"
          @click="play"
          v-if="(isPlayingAlbum && isPause) || isFirst"
        >
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
      </div>
    </div>
    <span class="song_name">{{ albumName }}</span>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    name: String, // 歌名
    indexCover: Number, // index
    albumId: Number, // 歌曲id (标记这首歌曲-为将来跳转播放页做准备)
    albumCover: String,
    albumCount: Number,
    albumName: String,
  },
  data() {
    return {
      isPause: 0,
      isFirst: 1,
    };
  },
  computed: {
    ...mapState(["isOnlyPlayFlag", "albumList", "typeList", "typeList"]),
    isPlayingAlbum: function () {
      return this.$store.state.albumList.id == this.albumId ? 1 : 0;
    },
  },
  methods: {
    //更改图标的状态
    play: function (e) {
      //点击播放按钮才吧歌曲压入list中
      if (!(this.$store.state.albumList.id == this.albumId)) {
        this.updatePlayListIndex(0)
        this.pushAlbumList(this.albumId);  //获取歌单的id和songs
        this.$store.dispatch("getAlbumSongs", this.albumId); //获取专辑歌单里的歌曲
        // this.$router.replace('/album')
      }
      setTimeout(()=>this.updateInfo(),1000)
      if (this.isFirst == 1) {
        this.isFirst = 0;
        this.updateIsbtnShow(false);
      } else if (this.isPlayingAlbum == 1 && this.isFirst == 0) {
        if (this.isPause == 1) {
          // console.log('isPause1:'+ this.isPause)
          this.isPause = 0;
          this.updateIsbtnShow(false);
        } else {
          this.isPause = 1;
          this.updateIsbtnShow(true);
        }
      }

      if ((this.$store.state.typeList == 0) || (this.$store.state.typeList == 2)) {
        this.updateTypeList(1);
      }

      console.log('冒泡：：'+ e)
      e.stopPropagation()
    },
    //点击专辑就将id压入$store的albumList
    pushToAlbumList: function (value) {
      if (!(this.$store.state.albumList.id == this.albumId)) {
        this.updatePlayListIndex(0)
        this.pushAlbumList(value);  //获取歌单的id和songs
        this.$store.dispatch("getAlbumSongs", this.albumId); //获取专辑歌单里的歌曲
        // this.$router.replace('/album')
        
      }
      this.$router.push({path:'../album'})
    },
    ...mapMutations(["updateIsbtnShow","updatePlayListIndex", "pushAlbumList", "updateTypeList","updateInfo"]),

    //改变数字的单位
    changeCount: function (count) {
      if (count > 100000000) {
        count = (count / 100000000).toFixed(1);
      } else if (count > 10000) {
        count = (count / 10000).toFixed(1) + "万";
      }
      return count;
    },
  },
  watch: {
    isPlayingAlbum: function () {
      // console.log(this.albumId + '我发生改变了！！！')
      if (this.isPlayingAlbum == 0) {
        this.isFirst = 1;
      }
    },
  },
};
</script>

<style scoped>
.personalized-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-left: 15px;
}
.album-cover {
  position: relative;
  height: 120px;
  width: 120px;
  overflow: hidden;
  background-color: saddlebrown;
  border-radius: 0.2rem;
}
.count {
  position: absolute;
  right: 4px;
  top: 6px;
  color: #fff;
  font-size: 14px;
}
.btn-active {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.btn-active .icon {
  color: #fff;
}
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>

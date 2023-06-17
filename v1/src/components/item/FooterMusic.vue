<!-- 底部播放音乐的菜单条 -->
<template>
  <div class="FooterMusic" :style="homeStyle">
    <div class="footer-left">
      <img :src="playingSongCover" alt="" />
      <div class="title">
        <p class="song_title">{{ playingSongName }}</p>
        <p class="text">- {{ playingSongAr }}</p>
      </div>
    </div>

    <div class="footer-right">
      <div class="icon_box" @click="play" v-if="isBtnShow">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
      </div>
      <div class="icon_box" @click="play" v-else>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zanting"></use>
        </svg>
      </div>
      <div class="icon_box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
    <!-- <audio
      ref="audio"
      @ended="ended"
      :src="`https://music.163.com/song/media/outer/url?id=${playSongId}.mp3`"
    ></audio> -->
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "isBtnShow",
      "audioPlayingList",
      "playListIndex",
      "playSongId",
      "playingSongName",
      "playingSongAr",
      "playingSongCover",
    ]),
  },
  props:{
    homeStyle:{
      bottom:'0px'
    }
  },
  methods: {
    play: function () {
      console.log('btn:'+ this.isBtnShow)
      if (this.isBtnShow) {
        // this.$refs.audio.autoplay = true;
        this.updateIsbtnShow(false);
      } else if(!this.isBtnShow){
        this.updateIsbtnShow(true);
      }
    },
    ...mapMutations(["updateIsbtnShow", "updatePlayListIndex", "updateInfo"]),
  },
  watch: {
    playSongId: function () {
      this.$refs.audio.autoplay = true;
    },
    playListIndex: function () {
      console.log("playListIndex: " + this.playListIndex);
      //监听如果下标发生了改变，就自动播放音乐
      // this.$refs.audio.autoplay = true;
      // if (this.$refs.audio.paused) {
      //   //如果是暂停状态，改变图标
      //   this.updateIsbtnShow(false);
      // }
    },
    isBtnShow:function(){
      console.log('btn1:'+ this.isBtnShow)
    }
  },
};
</script>

<style scoped>
.FooterMusic {
  position: fixed;
  /* bottom: 1.5rem; */
  height: 1.4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* background-color: steelblue; */
  padding: 0.2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 0;
}
.footer-left {
  /* background-color: red; */
  display: flex;
  align-items: center;

  height: 100%;
  width: 60%;
}
.title {
  display: inline-flex;
  align-items: center;
  margin-left: 0.2rem;
}
.title .song_title {
  font-size: 0.48rem;
  font-weight: bold;
  /* white-space: nowrap; */
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 1; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.footer-left .text {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 1; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
  font-size: 0.44rem;
  padding: 0 0.08rem;
  margin-top: 0.08rem;
  text-align: center;
}
.footer-left img {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
}
.footer-right {
  /* background-color: #fff; */
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.22rem;
}
.icon_box {
  /* background-color: yellow; */
  margin-left: 0.08rem;
}
.icon_box .icon {
  width: 0.6rem;
  height: 0.6rem;
}
</style>

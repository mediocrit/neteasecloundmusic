<template>
  <div >
    <router-view></router-view>
    <audio
      ref="audio"
      @ended="ended"
      :src="`https://music.163.com/song/media/outer/url?id=${playSongId}.mp3`"
    ></audio>
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
  // mounted(){
  //   this.$store.dispatch("getAlbumSongs", this.playSongId)
  // },

  updated() {
    console.log("update");
    console.log(this.$store.state.audioPlayingList);
  },
  methods: {
    //自动播放下一首个
    autoPlayNextIndex: function () {
      let index = this.playListIndex;
      index++;
      if (index > this.audioPlayingList.length) {
        index = this.audioPlayingList.length - 1;
      }
      this.updatePlayListIndex(index);
    },
    ended() {
      this.autoPlayNextIndex();
      this.updateInfo(); //更新播放栏的相关信息
    },
    ...mapMutations([
      "updateIsbtnShow", 
      "updatePlayListIndex", 
      "updateInfo"
    ]),
  },
  watch: {
    playSongId: function () {
      this.$refs.audio.pause()
      this.$refs.audio.autoplay = true;
    },
    playListIndex: function () {
      console.log("playListIndex: " + this.playListIndex);
      //监听如果下标发生了改变，就自动播放音乐
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        //如果是暂停状态，改变图标
        this.updateIsbtnShow(false);
      }
    },
    isBtnShow:function(){
      console.log('播放时间：'+ this.$refs.audio.currentTime)
      this.updateInfo()
      if(this.isBtnShow){
        this.$refs.audio.pause()
      }else{
        // setTimeout(()=>{this.$refs.audio.play()},500)
        this.$refs.audio.play()
      }
    }
  },
};
</script>

<style >
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
    /* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 4114559 */
  src: url('//at.alicdn.com/t/c/font_4114559_wuo6tpc378.woff2?t=1686321737402') format('woff2'),
       url('//at.alicdn.com/t/c/font_4114559_wuo6tpc378.woff?t=1686321737402') format('woff'),
       url('//at.alicdn.com/t/c/font_4114559_wuo6tpc378.ttf?t=1686321737402') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
</style>

<template>
  <div >
    <router-view></router-view>
    <audio
      ref="audio"
      @ended="playEnd"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[thisIndex]}.mp3`"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import {getSongUrlAPI} from '@/api/index'
export default {
  computed: {
    ...mapState([
      "isBtnShow",
      "id",
      "loopType",
      "playList",
      "song"
    ]),
    ...mapGetters([
      "nextSong",
      "thisIndex",
      "playListCount",
      "nextSong",
      "prevSong",
    ])
  },
  updated() {
    console.log("update");
    console.log(this.$store.state.audioPlayingList);
  },
  methods: {
    async play(ids){
      console.log("player")
      if(ids==this.id){
        return
      }
      this.updatedIsPlaying(false)
      this.updatedIsPause(false)
      this.updatedEnded(false)
      const data=await getSongUrlAPI({id:ids})
      if(data.url){
        this.$refs.audio.play()
        this.updatedIsPlaying(true)
        this.updatedSongURL(data)
      }else{
        console.log("该歌曲无法播放")
        this.deleteSong(ids)
        this.next()
      }
    },
    next() {
      //下一首
      if (this.loopType === 2) {
        this.randomPlay();
      } else if (this.id === this.nextSong.id) {
        // uni.showToast({
        //   icon: "none",
        //   title: "没有下一首",
        // });
        console.log("没有下一首了")
      } else {
        this.play(this.nextSong.id);
      }
    },
    prev() {
      //上一首
      if (this.id === this.prevSong.id) {
        // uni.showToast({
        //   icon: "none",
        //   title: "没有上一首",
        // });
        console.log("没有上一首歌")
      } else {
        this.play(this.prevSong.id);
      }
    },
    randomPlay() {
      //随机播放
      console.log("randomPlay");
      this.play(
        this.playList[Math.ceil(Math.random() * this.playList.length - 1)].id
      );
    },
    playEnd(){  //播放歌曲完毕后
      this.updatedIsPause(true)
      switch (this.loopType) {
        case 0:
          this.next();
          break;
        case 1:
          this.rePlay();
          break;
        case 2:
          this.randomPlay();
          break;
      }
    },
    togglePlay() {
      //播放暂停
      if (!this.song.id) {
        return;
      }
      // this.isPlaying = !this.isPlaying;
      this.updatedIsPlaying(!this.isPlaying)
      // const audio = getPlayer();
      if (!this.isPlaying) {
        // audio.pause();
        // this.isPause = true;
        this.$refs.audio.pause()
        this.updatedIsPause(true)
      } else {
        // audio.play();
        // this.isPause = false;
        this.$refs.audio.play()
        this.updatedIsPause(false)
      }
    },
    ...mapMutations([
      "updatedEnded",
      "updatedIsPause",
      "updatedIsPlaying",
      "updatedSongURL",
      "deleteSong",
    ])

  },
  watch: {
    playSongId: function () {
      this.$refs.audio.pause()
      this.$refs.audio.autoplay = true;
      // setTimeout(()=>{this.$refs.audio.play()},5000)
      // this.$refs.audio.play()

    },
    // isBtnShow:function(){
    //   console.log('播放时间：'+ this.$refs.audio.currentTime)
    //   this.updateInfo()
    //   if(this.isBtnShow){
    //     this.$refs.audio.pause()
    //   }else{
    //     // setTimeout(()=>{this.$refs.audio.play()},500)
    //     this.$refs.audio.play()
    //   }
    // }
    isBtnShow:function(){
      console.log('播放/暂停！！！！')
            if(this.isBtnShow){
        this.$refs.audio.pause()
      }else{
        // setTimeout(()=>{this.$refs.audio.play()},500)
        this.play()
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

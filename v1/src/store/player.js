export const usePlayerStore = defineStore({
  id: "Player",
  state: () => ({
    audio: uni.createInnerAudioContext(), //Audio实例
    loopType: 0, //循环模式 0：列表循环； 1：单曲循环； 2：随机播放
    // playList:[] as Song[], //播放列表
    playList: [],
    showPlayList: false, //播放列表显隐
    id: 0, //当前歌曲id
    url: "", //歌曲url
    songUrl: {},
    song: {},
    isPlaying: false, //是否播放
    isPause: false, //是否暂停
    sliderInput: false, //是否正在拖动进度条
    ended: false, //是否播放结束
    muted: false, //是否静音
    currentTime: 0, //当前播放时间
    duration: 0, //总播放时长
    currentLyric: null, //解析后歌词数据
    playerShow: false, //控制播放器显隐
  }),
  getters: {
    playListCount: (state) => {
      //播放列表歌曲总数
      return state.playList.length;
    },
    thisIndex: (state) => {
      //当前播放索引
      return state.playList.findIndex((song) => song.id === state.id);
    },
    nextSong: (state) => {
      //切换下一首
      const { thisIndex, playListCount } = this;
      if (thisIndex === playListCount - 1) {
        //最后一首
        return state.playList[0];
      } else {
        //切换下一首
        const nextIndex = thisIndex + 1;
        return state.playList[nextIndex];
      }
    },
    prevSong:state=>{  //返回上一首
        const {thisIndex}=this
        if(thisIndex===0){ //第一首
            return state.playList[state.playList.length -1]

        }else{  //返回上一首
            const prevIndex=thisIndex -1
            return state.playList[prevIndex]
        }
    }
  },
  actions:{ //播放列表里面添加音乐
    //replace:Boolean,...list:Song[]
    pushPlayList(replace,...list){
        if(replace){
           this.playList=list
           return 
        }
        list.forEach((song)=>{  //筛除重复歌曲
            if(this.playList.filter((s)=>s.id===song.id).length<=0){
                this.playList.push(song)
            }
        })
    },
    deleteSong(id){  //删除播放列表中的某歌曲  id:number
        this.playList.splice(this.playList.findIndex((s)=>s.id==id))
    },
    clearPlayerList(){  //清空播放列表
        this.songUrl={}
        this.url=''
        this.id=0
        this.song={}
        this.isPlaying=false
        this.sliderInput=false
        this.ended=false
        this.muted=false
        this.currentTime=0
        this.playList=[]
        this.showPlayList=false
        const audio=getPlayer()
        audio.stop()
        setTimeout(()=>{this.duration=0},500)
    },
    async play(id){  //播放
        console.log('player')
        if(id==this.id){
            return
        }
        this.ended=false
        this.isPause=false
        this.isPlaying=false
        const data=await getSongUrl(id)
        if(data.url&&1){  //img
            audio.play()
            this.isPlaying=true
            this.songUrl=data
            this.url=data.url
            audio.onError((err)=>{
                this.id=id
                uni.showToast({
                    icon:"error",
                    title:"该歌曲无法播放"
                })
                this.isPause=true
                //this.deleteSong(id)
                //this.next()
            })
        }else{
            uni.showToast({
                icon:"error",
                title:"该歌曲无法播放"
            })
            this.deleteSong(id)
            this.next()
        }
    },
    async getLyric(id){  //获取歌词
        const lyricData=await getSongLyric(id)
        const lyric=JSON.parse(JSON.stringify(lyricData)).lyric
        return lyric
    },
    saveLyric(currentLyric){ //缓存歌词
        this.currentLyric=currentLyric
    },
    playEnd(){
        this.isPause=true
        switch(this.loopType){
            case 0:this.next();break;
            case 1:this.rePlay();break;
            case 2:this.randomPlay();break;
        }
    },
    async songDetail(){  //获取歌曲详情
        this.song=await getSongDetail(this.id)
        this.pushPlayList(false,this.song)
    },
    rePlay(){  //重新播放
        setTimeout(()=>{
            console.log('rePlay')
            this.currentTime=0
            this.ended=false
            this.isPause=false
            this.isPlaying=true
            const audio=getPlayer()
            audio.seek(0)
            audio.play()
        },1500)
    },
    next(){  //下一首
        if(this.loopType===2){
            this.randomPlay
        }else if(this.id===this.nextSong.id){
            uni.showToast({
                icon:"none",
                title:"没有下一首"
            })
        }else{
            this.play(this.nextSong.id)
        }
    },
    prev(){  //上一首
        if(this.id===this.prevSong.id){
            uni.showToast({
                icon:"none",
                title:"没有上一首"
            })
        }else{
            this.play(this.prevSong.id)
        }
    },
    randomPlay(){  //随机播放
        console.log("randomPlay")
        this.play(this.playList[Math.ceil(Math.random() * this.playList.length -1)].id)
    },
    togglePlay(){  //播放暂停
        if(!this.song.id){
            return
        }
        this.isPlaying=!this.isPlaying
        const audio=getPlayer()
        if(!this.isPlaying){
            audio.pause()
            this.isPause=true
        }else{
            audio.play()
            this.isPause=false
        }
    },
    setPlay(){
        if(!this.song.id){
            return
        }
        const audio=getPlayer()
        this.isPlaying=true
        audio.isPause=false
    },
    setPause(){
        if(!this.song.id){
            return
        }
        const audio=getPlayer()
        this.isPlaying=false
        audio.isPause=true
    },
    toggleLoop(){  //切换循环类型
        if(this.loopType==2){
            this.loopType=0
        }else{
            this.loopType++
        }
    },
    forward(val){  //快进
        const audio=getPlayer()
        audio.seek(this.currentTime +val)
    },
    backup(val){
        const audio=getPlayer()
        if(this.currentTime<5){
            audio.seek(0)
        }else{
            audio.seek(this.currentTime - val)
        }       
    },
    onSliderChange(val){   //修改播放时间
        const audio=getPlayer()
        audio.seek(val)
    },
    interval(){ //定时器
        if(this.isPlaying&& !this.sliderInput){
            const audio=getPlayer()
            this.currentTime=parseInt(audio.currentTime.toString())
            this.duration=parseInt(audio.duration.toString())
            audio.onEnded(()=>{
                this.ended=true
            })
        }   
    },
    setPlayerShow(val){  //val  0:显示  1:隐藏
        if(val===0){
            this.playerShow=true
        }else{
            this.playerShow=false
        }
    }
    //" style="margin:auto" /> 

}
});

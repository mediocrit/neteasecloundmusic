import Vue from "vue";
import Vuex from "vuex";
import { getMusicPlaylistSongsHomeAPI } from "@/api/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //推荐专辑
    // albumList: [{ id: 893126993, songs: {} }],
    albumList: { id: "", songs: [] },
    typeList: 0, //0：默认值;  1:表示专辑  2：暂时表示单歌曲
    audioPlayingList: [], //表示正在播放音乐的list
    playListIndex: 0,
    isBtnShow: true, //暂停按钮的显示
    isOnlyPlayFlag: 0, //播放的歌曲只有0||1
    ////播放栏信息
    playingSongCover:"https://img01.yzcdn.cn/vant/cat.jpeg",
    playingSongName:"歌曲名",
    playingSongAr:"歌手",
    playSongId:494865824,
  },
  getters:{
    albumListID:function(state){
      return state.albumList.id
    }
  },

  mutations: {
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value
    },
    //切换播放暂停按钮的状态
    updateIsbtnShow: function (state, value) {
      //   console.log("value" + value);
      state.isBtnShow = value;
    },
    //此时播放的专辑
    pushAlbumList: function (state, id, value) {
      state.typeList = 1;
      state.albumList.id = id;
      state.albumList.songs = value;
    },
    //将歌曲压入播放列表中
    updateAudioPlayingList: function (state, value) {
      state.audioPlayingList = value;
    },
    ////////////////////
    //更新播放栏封面、歌名、歌手、歌曲id
    updateInfo:function(state){
      state.playingSongCover=state.audioPlayingList[state.playListIndex].al.picUrl //封面
      state.playingSongName = state.audioPlayingList[state.playListIndex].name;  //歌名
      state.playingSongAr = state.audioPlayingList[state.playListIndex].ar[0].name; //歌手
      state.playSongId=state.audioPlayingList[state.playListIndex].id 
    },
    //更新歌曲id
    // updateSongID:function(state){
    //   state.playSongId=state.audioPlayingList[state.playListIndex].id
    // },
    //判断此时播放的是否为专辑里的歌曲
    updateTypeList: function (state, value) {
      state.typeList = value;
    },
  },

  actions: {
    getAlbumSongs: async function (context, value) {
      let res = await getMusicPlaylistSongsHomeAPI({ id: value });
      let { id, tracks } = res.data.playlist;
      context.commit("updateAudioPlayingList", tracks);
      context.commit("pushAlbumList", id, tracks);
      // context.commit("updateInfo")
    },
  },
});

export default store;

import {
  getBannerHome,
  getMusicPlaylistHome,
  getMusicPlaylistSongsHome,
  getAlbumDetail,
  getSongUrl //获取单曲信息
} from "@/api/home/home";

//home-api
//1、获取首页的轮播图
export const getBannerHomeAPI = getBannerHome;
export const getMusicPlaylistHomeAPI = getMusicPlaylistHome;
export const getMusicPlaylistSongsHomeAPI = getMusicPlaylistSongsHome; //获取专辑歌单里的歌曲
export const getAlbumDetailAPI = getAlbumDetail;  //获取歌单详细信息
export const getSongUrlAPI=getSongUrl
import request from "@/request/index";

//获取轮播图
export const getBannerHome = () =>
  request({
    url: "/banner?type=2",
    method: "GET",
  });
//获取推荐歌单
export const getMusicPlaylistHome = () =>
  request({
    method: "GET",
    url: "/personalized?limit=10",
  });
//获取推荐歌单里的歌曲
export const getMusicPlaylistSongsHome = (params) =>
  request({
    method: "GET",
    url: "/playlist/detail",
    params,
  });
//获取歌单详情
export const getAlbumDetail=params=>request({
  method:"GET",
  url:'/related/playlist',
  params
})
//获取单曲的信息
export const getSongUrl=params=>request({
  method:'GET',
  url:'/song/url',
  params
})
<template>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/home/findMusic" icon="music-o">发现</van-tabbar-item>
      <van-tabbar-item replace to="/home/podCast" icon="qr">播客</van-tabbar-item>
      <van-tabbar-item replace to="/home/mySelf" icon="contact">我的</van-tabbar-item>
      <van-tabbar-item replace to="/home/followWithInterest" icon="like-o">关注</van-tabbar-item>
      <van-tabbar-item replace to="/home/communityX" icon="friends-o">社区</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

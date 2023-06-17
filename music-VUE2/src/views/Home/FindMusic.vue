<template>
  <div class="main-content">
    <!-- 轮播图 -->
    <div class="swipe-box">
      <van-swipe :autoplay="3000">
        <van-swipe-item
          v-for="(obj, index) in bannerList"
          :key="index + 1"
          indicator-color="#000000"
        >
          <img v-lazy="obj.pic" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 每日推荐等小功能 -->
    <item-music-nav></item-music-nav>
    <!-- 推荐歌单 -->
    <keep-alive>
      <related-item></related-item>
    </keep-alive>

    <keep-alive>
      <!-- 底部播放器 -->
      <FooterMusic :style="homeStyle"></FooterMusic>
    </keep-alive>
  </div>
</template>

<script>
import { getBannerHomeAPI } from "@/api/index";

import ItemMusicNav from "@/components/home/itemMusicNav.vue";
import relatedItem from "@/components/item/relatedItem.vue";
import FooterMusic from "@/components/item/FooterMusic.vue";
export default {
  components: { ItemMusicNav, relatedItem, FooterMusic },
  data() {
    return {
      bannerList: [], //初始化存储banner的容器
      homeStyle: {
        position: "fixed",
        bottom: '1.5rem', 
        height: "1.4rem",
        width: "100%",
        display: "flex",
        justifyContent: " space-between",
        /* background-color: steelblue; */
        padding: "0.2rem",
        borderTop: "1px solid rgba(0, 0, 0, 0.2)",
        borderBottom: "0",
      },
    };
  },
  async created() {
    let resBanner = await getBannerHomeAPI();
    this.bannerList = resBanner.data.banners;

    // console.log(res)
    // getBannersImages(this.bannerList)
  },
  computed: {},
  methods: {
    //  getBannersImages:function(obj){
    //     for(let key in obj){
    //         this.images.push(key[pic])
    //     }
    //     console.log(images)
    // }
  },
};
</script>

<style scoped>
.swipe-box {
  width: 100%;
  padding: 5px 0;
  /* border-radius: 16px; */
  overflow: hidden;
  /* background-color: steelblue; */
}
img {
  height: 130px;
  width: 100%;
  /* border-radius: 30px; */
  padding: 0 20px;
}
</style>

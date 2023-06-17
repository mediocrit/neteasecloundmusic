<template>
  <div class="related-container">
    <!-- 推荐歌单的标题 -->
    <div class="related-title">
      <span>推荐歌单</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiangyoujiantou"></use>
      </svg>
    </div>
    <div class="related-box" >
      <!-- <div class="box"> -->
      <item-personalized
        v-for="(obj, index) in albumItemList"
        :key="obj.id"
        :indexCover="index"
        :albumCover="obj.picUrl"
        :albumCount="obj.playCount"
        :albumName="obj.name"
        :albumId="obj.id"
        
      ></item-personalized>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { getMusicPlaylistHomeAPI } from "@/api/index";
import ItemPersonalized from "./itemPersonalized.vue";
// import { mapMutations } from 'vuex';
export default {
  components: { ItemPersonalized },
  data() {
    return {
      albumItemList: [], //推荐专辑的list
      // albumCoverList: [
      //   //推荐专辑的封面
      //   "https://img01.yzcdn.cn/vant/cat.jpeg",
      //   "https://img01.yzcdn.cn/vant/cat.jpeg",
      //   "https://img01.yzcdn.cn/vant/cat.jpeg",
      //   "https://img01.yzcdn.cn/vant/apple-2.jpg",
      //   "https://img01.yzcdn.cn/vant/cat.jpeg",
      //   "https://img01.yzcdn.cn/vant/apple-2.jpg",
      // ],
    };
  },
  async created() {
    let resPlayList = await getMusicPlaylistHomeAPI();
    // console.log(resPlayList.data.result);
    this.albumItemList = resPlayList.data.result;
  },
};
</script>

<style scoped>
.related-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.related-title {
  padding: 10px 18px;
  font-size: 20px;
  font-weight: bolder;
  /* margin: 20px 10px; */
}

/* 包裹推荐歌单的盒子 */
.related-box {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  overflow-x: scroll;
}
.box {
  width: 20%;
}
</style>

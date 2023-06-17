<template>
  <div>
    <!-- 我是歌单详情页面！！！！ -->
    <form>
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #left>
          <div @click="onBack">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zuojiantou"></use>
            </svg>
          </div>
        </template>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </form>
    <div class="brief-intro">
      <div class="img-box">
        <van-image
          width="100"
          height="100"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <span class="count">{{ changeCount(10000222) }}</span>
      </div>
      <div class="info-box">
        <p class="title">爆好听的英文歌</p>
        <div class="creator">
          <van-image
          width="100"
          height="100"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <p class="name"></p>
        <p class="labelBtn">
          <button>1</button>
          <button>2</button>
        </p>
        </div>
      </div>
    </div>
    <div class="text"></div>
    <div class="btn-Box"></div>
    <keep-alive>
      <!-- 底部播放器 -->
      <FooterMusic :style="albumStyle"></FooterMusic>
    </keep-alive>
  </div>
</template>

<script>
import FooterMusic from "@/components/item/FooterMusic.vue";
import { mapGetters, mapState } from 'vuex';
// import {getAlbumDetailAPI} from "@/api/index"
export default {
  components: { FooterMusic },
  data() {
    return {
      value: "",
      albumStyle: {
        position: "fixed",
        bottom: "0.28rem",
        height: "1.4rem",
        width: "100%",
        display: "flex",
        justifyContent: " space-between",
        /* background-color: steelblue; */
        padding: "0.2rem ",
        borderTop: "1px solid rgba(0, 0, 0, 0.2)",
        borderBottom: "0",
      },
    };
  },

  mounted(){
    console.log("teset:"+ this.audioPlayingList)
  },
  computed:{
    ...mapState(["albumList","audioPlayingList"]),
    ...mapGetters(["albumListID"])
  },
  methods: {
    onSearch() {
      // Toast(val);
    },
    onCancel() {
      // Toast('取消');
    },
    onBack() {
      this.$router.go(-1);
    },
    changeCount: function (count) {  //更改数字单位
      if (count > 100000000) {
        count = (count / 100000000).toFixed(1);
      } else if (count > 10000) {
        count = (count / 10000).toFixed(1) + "万";
      }
      return count;
    },
    
  },
};
</script>

<template>
  <div>
    <div class="top-nav">
      <!-- 左侧菜单：列表 -->
      <div class="left_nav">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-danlieliebiao"></use>
        </svg>
        <!-- <i class="iconfont">{{iconTest2[1]}}</i> -->
      </div>
      <!-- 中间搜索栏 -->
      <div class="content_nav">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <input type="text" placeholder="123"> -->
        <van-search
          v-model="searchValue"
          placeholder="请输入搜索关键词"
          shape="round"
          
        />
      </div>
      <!-- 右侧导航栏：包含 “免”（<v-if>）和“录音” -->
      <div class="right_nav">
        <div class="btn advertisement" v-show="true">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mian"></use>
          </svg>
        </div>
        <div class="btn thing">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-maikefeng"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchValue: "",
      // iconTest:['danlieliebiao','#icon-paihangbang','#icon-gedan'],
      // iconTest2:['\ue600','\ue601']
    };
  },
};
</script>

<style scoped>
.top-nav {
  /* background-color: steelblue; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  margin: 0;
  padding: 0.2rem 0.3rem;
  position: relative;
}
.left_nav {
  padding: 0 2px;
}
.right_nav {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: red; */
  padding: 2px 5px;
}
.right_nav .btn {
  margin: 0 5px;
}
.right_nav .btn.thing {
  margin-left: 8px;
  margin-right: 3px;
}
</style>

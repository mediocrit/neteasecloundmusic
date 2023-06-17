<template>
  <div class="item-box">
    <!-- 每日推荐 -->
    <div class="item-icon">
      <i class="iconfont">{{ iconDays[index] }}</i>
      <span>每日推荐</span>
    </div>
    <!-- 私人漫游 -->
    <div class="item-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouyinji"></use>
      </svg>
      <span>私人漫游</span>
    </div>
    <!-- 歌单 -->
    <div class="item-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan1"></use>
      </svg>
      <span>歌单</span>
    </div>
    <!-- 排行榜 -->
    <div class="item-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang1"></use>
      </svg>
      <span>排行榜</span>
    </div>
    <!-- 有声书 -->
    <div class="item-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shengyin_o"></use>
      </svg>
      <span>有声书</span>
    </div>
    <!-- 专辑 -->
    <div class="item-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhuanji"></use>
      </svg>
      <span>专辑</span>
    </div>
    <!-- 直播 -->
    <div class="item-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-airudiantubiaohuizhi-zhuanqu_zhibojian"></use>
      </svg>
      <span>直播</span>
    </div>
    <!-- 关注新歌 -->
    <div class="item-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-guanzhu"></use>
      </svg>
      <span>关注新歌</span>
    </div>
    <!-- 一歌一遇 -->
    <div class="item-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinle"></use>
      </svg>
      <span>一歌一遇</span>
    </div>
    <!-- 收藏家 -->
    <div class="item-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-044chuizi"></use>
      </svg>
      <span>收藏家</span>
    </div>
    <!-- 游戏专区 -->
    <div class="item-icon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-youxiji"></use>
      </svg>
      <span>游戏专区</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 日期
      iconDays: [
        "\ue600", // 1
        "\ue601",
        "\ue603",
        "\ue602",
        "\ue604", //5
        "\ue60d",
        "\ue605",
        "\ue606",
        "\ue608",
        "\ue60a",//10
        "\ue607",
        "\ue609",
        "\ue60b",
        "\ue60c",
        "\ue60e",//15
        "\ue610",
        "\ue60f",
        "\ue611",
        "\ue612",
        "\ue614",//20
        "\ue613",
        "\ue616",
        "\ue618",
        "\ue615",
        "\ue617",//25
        "\ue61a",
        "\ue619",
        "\ue61c",
        "\ue61b",
        "\ue61e",//30
        "\ue61d",
      ],
      // index: '',
    };
  },
  computed:{
    //日期的序号
    index:function(){
      let day=new Date().getDate()
      // console.log(day)
      return day-1
    }
  }
};
</script>

<style scoped>
.item-box{
    background-color: steelblue;
    display: flex;
    height: 80px;
    align-items: center;
    flex-shrink: 0;
    width: 100%;
    overflow-x:scroll ;
}
.iconfont{
    font-size: 22px;
    margin: 0 20px;
    /* margin-bottom: 2px; */
    /* margin-left: 40px; */
}
.item-icon{
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 8px;
}
.item-icon .icon{
    /* margin: 0 40px; */
    height: 0.6rem;
    width: 0.6rem;
}
.item-icon span{
    display: inline-block;
    width: 60px;
    font-size: 14px;
    text-align: center;
    margin-top: 5px;
    
}
</style>

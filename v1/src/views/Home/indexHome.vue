<template>
  <div>
    <top-nav></top-nav>
    <div class="main">
        <router-view></router-view>
    </div>
    <footer-nav></footer-nav>
    
  </div>
</template>
<script>
import TopNav from "@/components/home/TopNavItem.vue";
import FooterNav from "@/components/home/footerNavItem.vue";
export default {
  name: "indexHome",
  components: { TopNav, FooterNav },
};
</script>

<style scoped>
/* .footer{
  position: fixed;
  bottom: 0;
} */
</style>

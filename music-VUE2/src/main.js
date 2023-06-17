import Vue from "vue";
import Vuex from 'vuex'
import App from "./App.vue";
import "@/styles/reset.css";
import "@/mobile/flexible";

import router from "@/router/index";
import store from '@/store/index';

import {
  NavBar,
  Icon,
  Search,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Lazyload,
  Image as VanImage,
  Toast
} from "vant";

Vue.use(Vuex)

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Search);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload,{zyComponent: true,})
Vue.use(VanImage)
Vue.use(Toast)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

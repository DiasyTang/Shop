// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { get, post } from "./libs/_axios";
import VueCookie from "vue-cookie"
// import VueRouter from "vue-router";

require('../mock')

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueCookie);
// Vue.use(VueRouter);

Vue.prototype.$post = post;
Vue.prototype.$get = get;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

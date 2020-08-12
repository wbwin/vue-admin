/*
 * @Description: file information
 * @Author: Alex
 * @Date: 2020-08-10 17:36:20
 * @LastEditors: Alex
 * @LastEditTime: 2020-08-10 18:04:55
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Mock from './mock';
Mock.init();
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app');

/*
 * @Description: file information
 * @Author: will
 * @Date: 2020-05-09 09:02:18
 * @LastEditors: Alex
 * @LastEditTime: 2020-08-12 10:30:18
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

const login = r =>
  require.ensure([], () => r(require('../views/login.vue')), 'login');
const main = r =>
  require.ensure([], () => r(require('../views/index.vue')), 'main');
const accountList = r =>
  require.ensure(
    [],
    () => r(require('../views/account/accountList.vue')),
    'accountList'
  );
const userList = r =>
  require.ensure(
    [],
    () => r(require('../views/user/userList.vue')),
    'userList'
  );
const userDetail = r =>
  require.ensure(
    [],
    () => r(require('../views/user/userDetail.vue')),
    'userDetail'
  );
const reportList = r =>
  require.ensure(
    [],
    () => r(require('../views/cardReport/reportList.vue')),
    'reportList'
  );
const managerPage = r =>
  require.ensure(
    [],
    () => r(require('../views/system/managerPage.vue')),
    'managerPage'
  );
const everyDayCustomerAnalysis = r =>
  require.ensure(
    [],
    () => r(require('../views/report/everyDayCustomerAnalysis.vue')),
    'everyDayCustomerAnalysis'
  );
const topicPage = r =>
  require.ensure(
    [],
    () => r(require('../views/topic/managerPage.vue')),
    'topicPage'
  );
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    meta: {}
  },
  {
    path: '/main',
    name: '账户管理',
    component: main,
    iconCls: 'el-icon-s-home',
    children: [
      {
        path: '/accountList',
        name: 'accountList',
        meta: { name: '账户管理' },
        component: accountList
      }
    ]
  },
  {
    path: '/main',
    name: '用户管理',
    component: main,
    iconCls: 'el-icon-user-solid',
    meta: {},
    children: [
      {
        path: '/userList',
        name: 'userList',
        meta: { name: '用户列表' },
        component: userList
      },
      {
        path: '/userDetail',
        name: 'userDetail',
        meta: { name: '用户详情', parentName: 'userList' },
        component: userDetail
      }
    ]
  },
  {
    path: '/main',
    name: '举报管理',
    component: main,
    iconCls: 'el-icon-s-release',
    meta: {},
    children: [
      {
        path: '/reportList',
        name: 'reportList',
        meta: { name: '被举报列表' },
        component: reportList
      }
    ]
  },
  {
    path: '/main',
    name: '系统消息管理',
    component: main,
    iconCls: 'el-icon-s-comment',
    meta: {},
    children: [
      {
        path: '/managerPage',
        name: 'managerPage',
        meta: { name: '系统消息管理' },
        component: managerPage
      }
    ]
  },
  {
    path: '/main',
    name: '报表管理',
    component: main,
    iconCls: 'el-icon-s-platform',
    meta: {},
    children: [
      {
        path: '/everyDayCustomerAnalysis',
        name: 'everyDayCustomerAnalysis',
        meta: { name: '每日客户实时监控报表' },
        component: everyDayCustomerAnalysis
      }
    ]
  },
  {
    path: '/main',
    name: '话题管理',
    component: main,
    iconCls: 'el-icon-s-order',
    meta: {},
    children: [
      {
        path: '/topicPage',
        name: 'topicPage',
        meta: { name: '话题管理' },
        component: topicPage
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;

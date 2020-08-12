/*
 * @Description: HTTP请求工具类
 * @Author: will
 * @Date: 2020-05-09 09:02:18
 * @LastEditors: Alex
 * @LastEditTime: 2020-08-10 14:06:46
 */
import Vue from 'vue';
import axios from 'axios';
import router from '@/router';
import { getEncodeStr, getDecodeStr } from '@/utils/crypto';
import { helper } from '@/utils/helper';

//实例化Vue
let vm = new Vue();
//请求地址
axios.defaults.baseURL = process.env.VUE_APP_HOST;
console.log(process.env.VUE_APP_HOST);
//创建axios实例，在这里可以设置请求的默认配置
const instance = axios.create({
  timeout: 10000 // 设置超时时间10s
});
// 文档中的统一设置post请求头。
instance.defaults.headers.post['Content-Type'] =
  'application/json; charset=UTF-8';

//http状态码信息
const httpCode = {
  400: '请求参数错误',
  401: '权限不足, 请重新登录',
  403: '服务器拒绝本次访问',
  404: '请求资源未找到',
  500: '内部服务器错误',
  501: '服务器不支持该请求中使用的方法',
  502: '网关错误',
  504: '网关超时'
};

/**
 * @description: 请求拦截器
 * @param {type}
 * @return:
 */
axios.interceptors.request.use(
  config => {
    console.log('请求参数：' + JSON.stringify(config.data));
    let data;
    if (config.url != '/user/v1/tokenValid' && config.method === 'post') {
      data = getEncodeStr(config.data);
      if (data === false) {
        vm.$tips('加密失败');
        return Promise.reject(new Error('加密失败'));
      }
      config.data = data;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * @description: 响应拦截器
 * @param {type}
 * @return:
 */
axios.interceptors.response.use(
  response => {
    console.log('响应参数：' + JSON.stringify(response));
    // 非法请求
    if (response.data.code === process.env.VUE_APP_CONST_ERR_100008) {
      vm.$loadings(false);
      vm.$tips(response.data.message);
      // router.push({
      //   path: 'error',
      //   query: { type: 1, token: helper.getUrlKey('token') }
      // });
    }
    // 登陆失效状态
    if (response.data.code === process.env.VUE_APP_CONST_ERR_RYZ114) {
      vm.$messagess({
        msgTitle: '提示',
        msgContent: '登录失效，请重新登录',
        showCancel: false,
        confirmText: '我知道了'
      }).then(() => {
        // 跳转页面登陆页面
        router.push({
          path: '/login',
          query: { token: helper.getUrlKey('token') }
        });
      });
    }
    //特殊处理请求地址(可返回code及message)
    if (
      response.config.url === '/apply/v1/queryFaceResult' ||
      response.config.url === '/repayment/v1/repayment'
    ) {
      let data;
      data = getDecodeStr(response.data, false);
      if (data === false) {
        vm.$tips('解密验签失败');
        return Promise.reject(new Error('解密验签失败'));
      }
      return data;
    }
    // 成功状态
    if (response.data.code === process.env.VUE_APP_CONST_000000) {
      let data;
      if (response.config.url === '/user/v1/tokenValid') {
        data = getDecodeStr(response.data, true);
      } else {
        data = getDecodeStr(response.data, false);
      }
      if (data === false) {
        vm.$tips('解密验签失败');
        return Promise.reject(new Error('解密验签失败'));
      }
      try {
        return JSON.parse(data.data);
      } catch (error) {
        return data.data;
      }
    }
    // 其他状态
    let message = response.data.message;
    vm.$tips(message);
    return Promise.reject(new Error(message));
  },
  error => {
    if (error.response) {
      if (error.response.status === 404) {
        vm.$tips(httpCode[404]);
      } else if (error.response.status === 504) {
        vm.$tips(httpCode[504]);
      } else if (error.response.status === 500) {
        vm.$tips(httpCode[500]);
      } else if (error.response.status === 401) {
        vm.$messagess({
          msgTitle: '提示',
          msgContent: httpCode[401],
          showCancel: false,
          confirmText: '我知道了'
        }).then(() => {
          // 跳转页面登陆页面
          router.push({
            path: '/login',
            query: { token: helper.getUrlKey('token') }
          });
        });
      }
      return Promise.reject(error.response);
    } else {
      vm.$tips('网络异常，请稍后再试');
    }
  }
);

/**
 * @description: 统一封装GET请求
 * @param {type}
 * @return:
 */
export const get = (url, params) => {
  return axios({
    method: 'get',
    url: url,
    data: params
  });
};

/**
 * @description: 统一封装POST请求
 * @param {type}
 * @return:
 */
export const post = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params
  });
};

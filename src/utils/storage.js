/*
 * @Description: 本地存储工具类
 * @Author: will
 * @Date: 2020-05-09 09:49:51
 * @LastEditors: Alex
 * @LastEditTime: 2020-07-09 15:29:43
 */

/**
 * @description: 存储sessionStorage
 * @param key 键
 * @param value 值
 * @return:
 */
import { getEncodeParam, getDecodeParam } from '@/utils/crypto';
export const setStore = (key, value) => {
  if (!key) return;
  window.sessionStorage.setItem(key, JSON.stringify(getEncodeParam(value)));
};

/**
 * @description: 获取sessionStorage
 * @param key 键
 * @return:
 */
export const getStore = key => {
  let storage = getDecodeParam(JSON.parse(window.sessionStorage.getItem(key)));
  if (!key) return;
  return storage;
};

/**
 * @description: 删除sessionStorage
 * @param key 键
 * @return:
 */
export const removeStore = key => {
  if (!key) return;
  window.sessionStorage.removeItem(key);
};

/**
 * @description: 删除所有sessionStorage
 * @return:
 */
export const removeAllStore = () => {
  window.sessionStorage.clear();
};
export const addCookie = (name, value, expireHours) => {
  var cookieString =
    name + '=' + JSON.stringify(getEncodeParam(value, true)) + '; path=/';
  //判断是否设置过期时间
  if (expireHours > 0) {
    var date = new Date();
    date.setTime(date.getTime() + expireHours * 3600 * 1000);
    cookieString = cookieString + ';expires=' + date.toGMTString();
  }
  document.cookie = cookieString;
};

export const getCookie = name => {
  var strcookie = document.cookie;
  var arrcookie = strcookie.split('; ');
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split('=');
    if (arr[0] == name) return getDecodeParam(JSON.parse(arr[1]), true);
  }
  return null;
};

export const delCookie = name => {
  //删除cookie
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie =
      name + '=' + cval + '; path=/;expires=' + exp.toGMTString();
};

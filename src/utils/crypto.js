/*
 * @Description: 加解密，签名验签，MD5工具类
 * @Author: will
 * @Date: 2020-05-09 09:02:18
 * @LastEditors: Alex
 * @LastEditTime: 2020-07-09 15:45:44
 */
import CryptoJS from 'crypto-js';
import store from '@/store';
let defaultPrivateKey = '012345678901234567890123';
/**
 * @description:  数据加密签名
 * @param str 加密/签名请求串
 * @return:
 */
export const getEncodeStr = str => {
  try {
    //加密密钥
    let privateKey = store.getters['GET_USER'].key;
    let token = store.getters['GET_USER'].token;
    console.log('privateKey:' + privateKey);
    console.log('token:' + token);
    let encStr = {}; // 加密串
    encStr.token = token;

    encStr.timestamp = new Date().getTime().toString();
    /** 数据加密 */
    let key = CryptoJS.enc.Utf8.parse(privateKey);
    let srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(str));
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    encStr.data = encrypted.toString();
    /** 数据签名 */
    let signStr = encStr.token + encStr.timestamp + encStr.data + privateKey;
    encStr.sign = CryptoJS.SHA256(signStr).toString();
    console.log('加密后数据:' + JSON.stringify(encStr));
    return encStr;
  } catch (error) {
    console.log('加密异常:' + error);
    return false;
  }
};

/**
 * @description:  数据验签解密
 * @param str 验签/解密请求串
 * @return:
 */
export const getDecodeStr = (str, mark = false) => {
  if (str.data != undefined && str.data != null) {
    let privateKey = mark
      ? str.token.substring(16)
      : store.getters['GET_USER'].key;
    /** 验签 */
    let signStr = str.token + str.timestamp + str.data + privateKey;
    signStr = CryptoJS.SHA256(signStr).toString();
    if (signStr != str.sign) {
      console.log('验签结果:' + signStr != str.sign);
      return false;
    }

    try {
      /** 解密 */
      var key = CryptoJS.enc.Utf8.parse(privateKey);
      var decrypt = CryptoJS.AES.decrypt(str.data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      str.data = CryptoJS.enc.Utf8.stringify(decrypt).toString();
      console.log('解密后数据：' + JSON.stringify(str));
      if (str.data == '') {
        return false;
      }
    } catch (error) {
      console.log('解密异常:' + error);
      return false;
    }
  }
  return str;
};

/**
 * @description: MD5加密
 * @param str 请求串
 * @return:
 */
export const getMd5 = str => {
  var MD5 = CryptoJS.MD5(str).toString();
  return MD5;
};

/**
 * @description: 前端参数加密
 * @param {type}
 * @return:
 */
export const getEncodeParam = (param, defaultKey = false) => {
  if (param) {
    //加密密钥
    let privateKey = defaultKey
      ? defaultPrivateKey
      : store.getters['GET_USER'].key;
    /** 数据加密 */
    let key = CryptoJS.enc.Utf8.parse(privateKey);
    let srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(param));
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  } else {
    return null;
  }
};

/**
 * @description: 前端参数解密
 * @param {type}
 * @return:
 */
export const getDecodeParam = (param, defaultKey = false) => {
  if (param) {
    //密钥

    let privateKey = defaultKey
      ? defaultPrivateKey
      : store.getters['GET_USER'].key;
    console.log(privateKey);
    /** 解密 */
    try {
      var key = CryptoJS.enc.Utf8.parse(privateKey);

      var decrypt = CryptoJS.AES.decrypt(param, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      console.log(key);
      return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
    } catch (error) {
      //报错则清掉缓存 跳回login页面
      window.sessionStorage.clear();
      window.location.href =
        window.location.origin + '/login' + window.location.search;
      return false;
    }
  } else {
    return null;
  }
};

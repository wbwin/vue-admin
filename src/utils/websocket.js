/*
 * @Description: file information
 * @Author: natsu
 * @Date: 2020-05-21 14:30:53
 * @LastEditors: natsu
 * @LastEditTime: 2020-05-27 15:08:07
 */
import Vue from 'vue';
let vm = new Vue();

let websock = null;
let messageCallback = null;
let errorCallback = null;
let websocketCallback = null;
let wsUrl = '';

// 接收ws后端返回的数据
function websocketonmessage(e) {
  messageCallback(e.data);
}

/**
 * 发起websocket连接
 * @param {Object} agentData 需要向后台传递的参数数据
 */
function websocketSend(agentData) {
  // 加延迟是为了尽量让ws连接状态变为OPEN
  setTimeout(() => {
    // 添加状态判断，当为OPEN时，发送消息
    if (websock.readyState === websock.OPEN) {
      // websock.OPEN = 1
      // 发给后端的数据需要字符串化
      if (agentData != null) {
        websock.send(JSON.stringify(agentData));
      }
    }
    if (websock.readyState === websock.CLOSED) {
      console.log('Websock连接异常，请稍候重试, 状态:' + websock.readyState);
      errorCallback();
    }
  }, 500);
}

// 关闭ws连接
function websocketclose(e) {
  // e.code === 1000  表示正常关闭。 无论为何目的而创建, 该链接都已成功完成任务。
  // e.code !== 1000  表示非正常关闭。
  if (e && e.code !== 1000) {
    console.log('Websock连接异常，请稍候重试, 状态:' + e.code);
    errorCallback();
  }
}
// 建立ws连接
function websocketOpen(e) {
  if (e === undefined) {
    console.log('Websock连接成功......');
  } else {
    console.log('Websock连接成功,信息:' + e);
  }
  websocketCallback();
}

// 初始化weosocket
function initWebSocket() {
  if (typeof WebSocket === 'undefined') {
    vm.$tips('您的浏览器不支持WebSocket，无法获取数据');
    return false;
  }
  websock = new WebSocket(wsUrl);

  websock.onmessage = function(e) {
    websocketonmessage(e);
  };
  websock.onopen = function() {
    websocketOpen();
  };
  websock.onerror = function() {
    console.log('Websock连接异常，请稍候重试');
    errorCallback();
  };
  websock.onclose = function(e) {
    websocketclose(e);
  };
}

/**
 * 发起websocket请求函数
 * @param {string} url ws连接地址
 * @param {Object} agentData 传给后台的参数
 * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
 * @param {function} errCallback ws连接错误的回调函数
 */
export function sendWebsocket(
  url,
  agentData,
  successCallback,
  errCallback,
  callback
) {
  wsUrl = url;
  initWebSocket();
  messageCallback = successCallback;
  errorCallback = errCallback;
  websocketCallback = callback;
  websocketSend(agentData);
}

/**
 * 关闭websocket函数
 */
export function closeWebsocket() {
  if (websock) {
    websock.close(); // 关闭websocket
    websock.onclose(); // 关闭websocket
  }
}

/*
 * @Description: file information
 * @Author: Alex
 * @Date: 2020-08-10 17:51:55
 * @LastEditors: Alex
 * @LastEditTime: 2020-08-11 17:29:30
 */
import axios from 'axios';

let base = '';

export const requestLogin = params => {
  return axios.post(`${base}/login`, params).then(res => res.data);
};
export const getUserList = params => {
  return axios.get(`${base}/list`, { params: params });
};
export const editUser = params => {
  return axios.get(`${base}/edit`, { params: params });
};
export const cancellationUser = params => {
  return axios.get(`${base}/cancellation`, { params: params });
};
export const delsUser = params => {
  return axios.get(`${base}/delsUser`, { params: params });
};
export const addUser = params => {
  return axios.get(`${base}/addUser`, { params: params });
};

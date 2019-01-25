import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
export const getUserList = params => { return axios.get(`${base}/list`, { params: params }); };
export const editUser=params=>{return axios.get(`${base}/edit`,{params:params})}
export const delUser=params=>{return axios.get(`${base}/delUser`,{params:params})}
export const delsUser=params=>{return axios.get(`${base}/delsUser`,{params:params})}
export const addUser=params=>{return axios.get(`${base}/addUser`,{params:params})}

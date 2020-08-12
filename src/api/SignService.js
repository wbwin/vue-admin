/*
 * @Description: 签约模块
 * @Author: will
 * @Date: 2020-05-09 09:02:18
 * @LastEditors: will
 * @LastEditTime: 2020-05-22 21:14:39
 */
import { post } from '@/utils/http';
// import { getEncodeStr } from '@/utils/crypto';

/** 获取合同列表 */
export const showContractList = msg =>
  post('/contract/v1/showContractList', msg);

/** 打开安心签页面 */
export const doTrustSignAuth = msg => post('/contract/v1/doTrustSignAuth', msg);

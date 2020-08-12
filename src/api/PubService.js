/*
 * @Description: 公共模块
 * @Author: ryan
 * @Date: 2020-05-13 15:12:20
 * @LastEditors: will
 * @LastEditTime: 2020-05-22 21:14:46
 */
import { post } from '@/utils/http';

/** 初始化参数 */
export const getLoadData = msg => post('/pub/v1/loadData', msg);

/** 获取流程步骤 */
export const getAppStep = msg => post('/pub/v1/getAppStep', msg);

/**获取首页数据 */
export const getCurrentAccount = msg => post('/pub/v1/getCurrentAccount', msg);

/**准入状态查询 */
export const getApplyStatus = msg => post('/pub/v1/getApplyStatus', msg);

/**还款状态查询 */
export const getPayStatus = msg => post('/pub/v1/getPayStatus', msg);

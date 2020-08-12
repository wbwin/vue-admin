/*
 * @Description: 用户模块
 * @Author: will
 * @Date: 2020-05-09 09:02:18
 * @LastEditors: cailu
 * @LastEditTime: 2020-07-03 18:21:01
 */
import { post } from '@/utils/http';

/** 获取贷款信息确认 */
export const queryLimitConfirmData = msg =>
  post('/contract/v1/getLoanData', msg);
/** 获取签约数据 */
export const getSignLoanData = msg => post('/contract/v1/getSignLoanData', msg);
/** 还款计划 */
export const payPlan = msg => post('/contract/v1/payPlan', msg);
/** 确认贷款信息 */
export const foticConfirmLimit = msg => post('/contract/v1/confirm', msg);
/** 确认是否查看征信合同 */
export const confirmCreditAuthLook = msg =>
  post('/contract/v1/confirmCreditAuthLook', msg);
/** 查询银行卡是否已签约快捷支付 */
export const checkPaymentAuth = msg =>
  post('/contract/v1/checkPaymentAuth', msg);

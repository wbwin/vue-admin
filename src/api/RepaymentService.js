/*
 * @Description: 还款模块
 * @Author: will
 * @Date: 2020-05-22 20:56:33
 * @LastEditors: natsu
 * @LastEditTime: 2020-06-24 16:37:05
 */
import { post } from '@/utils/http';

/** 查询还款基本信息 */
export const queryRepaymentBase = msg =>
  post('/repayment/v1/queryRepaymentBase', msg);

/** 查询期数信息 */
export const queryRepaymentPeriod = msg =>
  post('/repayment/v1/queryRepaymentPeriod', msg);

/** 查询结清金额 */
export const querySettlAmt = msg => post('/repayment/v1/querySettlAmt', msg);

/** 一键还款 */
export const repayment = msg => post('/repayment/v1/repayment', msg);

/** 查询还款银行卡列表 */
export const queryBankCardList = msg =>
  post('/repayment/v1/queryBankCardList', msg);

/** 获取还款验证码 */
export const gainVerificationCode = msg =>
  post('/repayment/v1/gainVerificationCode', msg);

/** 查询银行卡手续费配置 */
export const queryBankCardType = msg =>
  post('/repayment/v1/queryBankCardType', msg);

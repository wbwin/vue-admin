/*
 * @Description: 账户模块
 * @Author: will
 * @Date: 2020-05-22 21:14:25
 * @LastEditors: cailu
 * @LastEditTime: 2020-06-23 10:07:37
 */
import { post } from '@/utils/http';

/** 当前账单 */
export const queryCurrentAccount = msg =>
  post('/account/v1/queryCurrentAccount', msg);

/** 历史账单 */
export const queryHistoryAccount = msg =>
  post('/account/v1/queryHistoryAccount', msg);

/**查询我的银行卡列表 */
export const myBankList = msg => post('/account/v1/myBankList', msg);

/**更换绑定的银行卡 */
export const updateOtherBankCard = msg =>
  post('/account/v1/updateOtherBankCard', msg);

/**更换扣款的银行卡 */
export const updateLoanBankInfo = msg =>
  post('/account/v1/updateLoanBankInfo', msg);

/**银行卡修改 授权认证 */
export const authBankCardResult = msg =>
  post('/account/v1/authBankCardResult', msg);
/**根据ID查询银行卡信息 */
export const getBankCardId = msg => post('/account/v1/getBankCardId', msg);
/** 查看可支持的信用卡 */
export const showBankCard = msg => post('/account/v1/showBankCard', msg);
/** 查询通联合同是否签署成功 */
export const queryIsCardContract = msg =>
  post('/account/v1/queryIsCardContract', msg);

/*
 * @Description: 用户模块
 * @Author: will
 * @Date: 2020-05-09 09:02:18
 * @LastEditors: will
 * @LastEditTime: 2020-05-22 20:57:00
 */
import { post } from '@/utils/http';

/** 验证token */
export const tokenValid = msg => post('/user/v1/tokenValid', msg);
/** 用户登录 */
export const userLogin = msg => post('/user/v1/loginVerificationCode', msg);

/**获取短信验证码 */
export const getVerificationCode = msg =>
  post('/user/v1/getLoginCode', msg);

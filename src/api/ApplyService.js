/*
 * @Description: 申请模块
 * @Author: will
 * @Date: 2020-05-22 20:56:33
 * @LastEditors: will
 * @LastEditTime: 2020-06-04 15:49:42
 */
import { post } from '@/utils/http';

/** 正面身份证图片OCR识别 */
export const identificationFrontImage = msg =>
  post('/apply/v1/identificationFrontImage', msg);

/** 反面身份证图片OCR识别 */
export const identificationBackImage = msg =>
  post('/apply/v1/identificationBackImage', msg);

/** 保存身份认证信息 */
export const saveIdentificationInfo = msg =>
  post('/apply/v1/saveIdentificationInfo', msg);

/** 查询身份认证信息 */
export const queryIdentificationInfo = msg =>
  post('/apply/v1/queryIdentificationInfo', msg);

/** 打开人脸识别 */
export const openFace = msg => post('/apply/v1/openFace', msg);

/** 获取人脸识别结果 */
export const queryFaceResult = msg => post('/apply/v1/queryFaceResult', msg);

/** 保存联系人信息 */
export const saveContactPersonInfo = msg =>
  post('/apply/v1/saveContactPersonInfo', msg);

/** 查询联系人信息*/
export const queryContactPersonInfo = msg =>
  post('/apply/v1/queryContactPersonInfo', msg);

/** 保存贷款信息 */
export const saveLoanInfo = msg => post('/apply/v1/saveLoanInfo', msg);

/** 查询贷款信息 */
export const queryLoanInfo = msg => post('/apply/v1/queryLoanInfo', msg);

/** 查询营业执照信息 */
export const queryBusinessLicenseInfo = msg =>
  post('/apply/v1/queryBusinessLicenseInfo', msg);

/** 营业执照扫描 */
export const businessLicenseOcrScan = msg =>
  post('/apply/v1/businessLicenseOcrScan', msg);

/** 保存扫描的营业执照 */
export const saveBusinessLicenseInfo = msg =>
  post('/apply/v1/saveBusinessLicenseInfo', msg);

/** 查询个人信息 */
export const queryPersonInfo = msg => post('/apply/v1/queryPersonInfo', msg);

/** 保存个人信息 */
export const savePersonInfo = msg => post('/apply/v1/savePersonInfo', msg);

/** 进度中心 */
export const getLoanScheduleInfo = msg =>
  post('/apply/v1/getLoanScheduleInfo', msg);

/** 上传银行卡ocr识别*/
export const bankCardOcrScan = msg => post('/apply/v1/bankCardOcrScan', msg);

/**获取快捷支付短信验证码 */
export const getPaymentAuthCode = msg =>
  post('/apply/v1/getPaymentAuthCode', msg);

/**查询其他信息 */
export const queryOtherProgress = msg =>
  post('/apply/v1/queryOtherProgress', msg);

/**获取快捷支付授权结果*/
export const queryPaymentAuthResult = msg =>
  post('/apply/v1/queryPaymentAuthResult', msg);

/**添加银行卡*/
export const saveBankCard = msg => post('/apply/v1/saveBankCard', msg);
/** 查询是否做完身份认证 */
export const queryIfIdentification = msg =>
  post('/apply/v1/queryIfIdentification', msg);

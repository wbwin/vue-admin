/*
 * @Description: 常用函数工具类
 * @Author: will
 * @Date: 2020-05-13 09:44:18
 * @LastEditors: Alex
 * @LastEditTime: 2020-08-06 17:59:40
 */
export const helper = {
  /**
   * @description: 获取URL参数
   * @param {type}
   * @return:
   */
  getUrlKey(name) {
    return (
      decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
          location.href
        ) || [, ''])[1].replace(/\+/g, '%20')
      ) || null
    );
  },

  /**
   * @description: 日期格式化
   * @param val 请求参数
   * @param fmt 格式化参数
   * @return:
   */
  formatDate(val, fmt) {
    if (val != null && val != '') {
      var date = new Date(val);
      var yyyy = date.getFullYear();
      var mm =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1);
      var dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      var hh = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
      var mi =
        date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
      var ss =
        date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
      fmt = fmt == undefined ? '' : fmt.toLocaleLowerCase();
      if (fmt == 'yyyy-mm-dd') {
        return yyyy + '-' + mm + '-' + dd;
      } else if (fmt == 'yyyy-mm-dd hh:mi:ss') {
        return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss;
      } else if (fmt == 'yyyy-mm-dd hh:mi') {
        return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi;
      } else if (fmt == 'yyyy/mm/dd') {
        return yyyy + '/' + mm + '/' + dd;
      } else if (fmt == 'yyyy.mm.dd') {
        return yyyy + '.' + mm + '.' + dd;
      } else {
        return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + mi + ':' + ss;
      }
    }
  },
  /**
   * @description: 校验手机号
   * @param phone 手机号
   * @return:
   */
  isValidPhone(phone) {
    let exp = /^0?1[3|4|5|8|7|6|9][0-9]\d{8}$/;
    return exp.test(phone);
  },
  /**
   * @description: 校验身份证
   * @param {string} 18位身份证号
   * @return:true：验证成功 false：验证失败
   */
  validateIdCard(cid) {
    if (!/(^\d{17}([0-9]|X)$)/.test(cid)) {
      return false;
    } else {
      var arr = cid.match(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/); //检查生日日期是否正确
      var bd = new Date(arr[2] + '/' + arr[3] + '/' + arr[4]);
      if (
        bd.getFullYear() == arr[2] &&
        bd.getMonth() + 1 == arr[3] &&
        bd.getDate() == arr[4]
      ) {
        //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var arrInt = new Array(
          7,
          9,
          10,
          5,
          8,
          4,
          2,
          1,
          6,
          3,
          7,
          9,
          10,
          5,
          8,
          4,
          2
        );
        var arrCh = new Array(
          '1',
          '0',
          'X',
          '9',
          '8',
          '7',
          '6',
          '5',
          '4',
          '3',
          '2'
        );
        var t = 0;
        for (var i = 0; i < 17; i++) {
          t += cid.substr(i, 1) * arrInt[i];
        }
        return arrCh[t % 11] == cid.substr(17, 1);
      } else {
        return false;
      }
    }
  },
  /**
   * @description:校验是否为日期
   * @param {string} '-'分隔的日期参数
   * @return: true：是日期，false：非日期
   */
  isValidDate(d) {
    if (d) {
      if (
        d.match(
          /^19|20[\d]{2}-(0?[1-9]|1[0-2])-((0?[1-9])|((1|2)[0-9])|30|31)$/
        ) != null
      ) {
        var t = new Date(d.replace(/-/g, '/'));
        var ar = d.split(/-/);
        return (
          ar[0] == t.getFullYear() &&
          ar[1] == t.getMonth() + 1 &&
          ar[2] == t.getDate()
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  /**
   * @description: 返回日期相差天数
   * @param {type} 日期格式yyyy-MM-dd
   * @return: 天数
   */
  getDaysInterval(d1, d2) {
    var diff = NaN;
    if (helper.isValidDate(d1) && helper.isValidDate(d2)) {
      diff = Math.ceil(
        (new Date(d2.replace(/-/g, '/')).getTime() -
          new Date(d1.replace(/-/g, '/')).getTime()) /
          (1000 * 60 * 60 * 24)
      );
    }
    return diff;
  },
  /**
   * @description:是否是纯数字
   * @param {string}
   * @return:true 正确 false 错误
   */
  isNumber(str) {
    var reg = /^\d{1,}$/;
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
   * @description:是否是n位纯数字
   * @param {string}
   * @param {n}
   * @return:true 正确 false 错误
   */
  isNumber6(str) {
    var reg = /^\d{6}$/;
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
   * @description:是否为空
   * @param {string}
   * @return:true 正确 false 错误
   */
  isEmpty(str) {
    if (!str || str.length < 1) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * @description:是否最少n位字符 最多k位字符
   * @param {string,number,number}
   * @return:true 正确 false 错误
   */
  limitDigits(str, n, k) {
    console.log(str.length < n || str.length > k);
    if (str.length < n || str.length > k) {
      return false;
    } else {
      return true;
    }
  },
  /**
   * @description:是否是正数
   * @param {string}
   * @return:true 正确 false 错误
   */
  isPositiveNumber(str) {
    var reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
   * @description: 是否为纯英文
   * @param {string}
   * @return: true 正确 false 错误
   */
  isEvald(str) {
    var reg = /^[A-Za-z]+$/;
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },

  /**
   * @description: 是否为正确金额
   * @param {string}
   * @return: true 正确 false 错误
   */
  isAmount(str) {
    var reg = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){0,2})?$/;
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },

  /**
   * @description: 是否为英文和数字组合
   * @param {String}
   * @return: true 正确 false 错误
   */
  isNumberOrEvald(str) {
    var reg = /^(?![^A-z]+$)(?!\D+$)[A-z\d]+$/;
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
   * @description: 是否为15位的英文和数字组合
   * @param {String}
   * @return: true 正确 false 错误
   */
  isNumber15OrEvald(str) {
    var reg = /^[a-z0-9A-Z]{15,20}$/;
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  isNumber18OrEvald(str) {
    var reg = /^[a-z0-9A-Z]{18}$/;
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
   * @description: 是否英文和数字组合
   * @param {String}
   * @return: true 正确 false 错误
   */
  isNumOrEva(str) {
    var reg = /^[a-z0-9A-Z]+$/;
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },

  /**
   * @description: 判断是否是纯汉字
   * @param {String}
   * @return: true 正确 false 错误
   */
  isText(str) {
    var reg = '^[\u4e00-\u9fa5]+$';
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
   * @description: 是否英文、数字、中文组合
   * @param {*} str
   * @return: true 正确 false 错误
   */
  isNumOrEvaOrText(str) {
    var reg = '^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){1,70}$';
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
   * @description: 是否英文、中文组合
   * @param {*} str
   * @return: true 正确 false 错误
   */
  isEvaOrText(str) {
    var reg = '^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){2,20}$';
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
   * @description: 是否英文、数字、中文和以下允许的特殊字符
                    允许的特殊字符：
                    6个全角符号：“（）”;“＃”;“－”;“，”;“、”;“。”;
                    4个半角符号：“()”;“#”;“-”;“,”组合
   * @param {*} str
   * @return: true 正确 false 错误
   */
  isNumOrEvaOrTextOrSpecial(str) {
    var reg =
      '^([（）＃－，、。()#,-]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){1,70}$';
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
     * @description: 是否英文、数字、中文、空格和以下允许的特殊字符
                      允许的特殊字符：
                      7个全角符号：“（）”;“＃”;“－”;“，”;“、”;“。”;“＊”
                      5个半角符号：“()”;“#”;“-”;“,”;“*”组合
    * @param {*} str
    * @return: true 正确 false 错误
    */
  isNumOrEvaOrTextOrSpecialOCR(str) {
    var reg =
      '^([（）＃－，、。＊ *()#,-]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9]){2,50}$';
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
     * @description: 是否英文、数字、中文、和以下允许的特殊字符
                      允许的特殊字符：
                      7个全角符号：“（）”;“＃”;“－”;“，”;“、”;“。”;“＊”
                      5个半角符号：“()”;“#”;“-”;“,”;“*”组合
    * @param {*} str
    * @return: true 正确 false 错误
    */
  isNumOrEvaOrTextOrSpecialOCRNoSpace(str) {
    var reg =
      '^([（）＃－，、。()#,-]|[\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9]){4,60}$';
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
   * @description: 判断邮箱是否合法
   * @param {String}
   * @return: true 正确 false 错误
   */
  isEmail(str) {
    var reg = /^[a-z,A-Z,0-9]+@[a-z,A-Z]+.[a-z,A-Z]+$/;
    var pattern = new RegExp(reg);
    return pattern.test(str);
  },
  /**
   * @description: 返回设备类型
   * @param {String}
   * @return:  返回设备类型
   */
  getBrowserTerminal() {
    let u = navigator.userAgent;
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头getBrowserTerminal部与底部
    };
  },
  getBrowserVer() {
    //判断是否是移动设备打开
    if (helper.getBrowserTerminal().mobile) {
      var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        //在微信中打开
        return 'WEIXIN_MOBILE';
      }
      if (ua.match(/WeiBo/i) == 'weibo') {
        //在新浪微博客户端打开
        return 'WEIBO_MOBILE';
      }
      if (ua.match(/QQ/i) == 'qq') {
        //在QQ空间打开
        return 'QQ_MOBILE';
      }
      if (ua.match(/windows mobile/i)) {
        //在windows手机浏览器打开
        return 'WINDOWS_MOBILE';
      }
      if (helper.getBrowserTerminal().ios) {
        //是否在IOS浏览器打开
        return 'IOS_MOBILE';
      }
      if (helper.getBrowserTerminal().android) {
        //是否在安卓浏览器打开
        return 'ANDROID_MOBILE';
      }
    } else {
      return 'PC';
    }
  }
};

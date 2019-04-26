import axios from 'axios';
import $ from 'jquery';
import { Cookie } from './Cookie';
 /**
 * @description 判断参数是否为字符串
 * @method isString
 * @param {Object} obj
 * @return {Boolean} 是否为字符串
 */
const isString = (obj) => {
  if (obj == null) {
    return false;
  }
  return Object.prototype.toString.call(obj) === '[object String]';
};
/**
 * @description 去除字符串的前后空格，包含回车字符
 * @method trimStr
 * @param {String} str 字符串
 * @return {String} 处理后的字符串
 */
const trimStr = (str) => {
  if (str == null || !isString(str)) {
    return str;
  }

  let pTempStr = str.replace(/(^\r\n*)|(\r\n*$)/g, '');
  pTempStr = pTempStr.replace(/(^\n*)|(\n*$)/g, '');
  pTempStr = pTempStr.replace(/(^\s*)|(\s*$)/g, '');
  pTempStr = pTempStr.replace(/(^\r*)|(\r*$)/g, '');
  return pTempStr;
};
/**
 * @description 判断字符串是否为空
 * @method isStrNullOrEmpty
 * @param {String} str 字符串
 * @return {Boolean} 是否为空
 */
const isStrNullOrEmpty = (str) => {
  if (str == null) {
    return true;
  }
  if (!isString(str)) {
    return false;
  }
  let bEmpty = true;
  const pTempStr = trimStr(str);
  for (let ii = 0; ii < pTempStr.length; ii++) {
    const pTempChar = pTempStr[ii];
    if (pTempChar !== ' ' && pTempChar !== '↵') {
      bEmpty = false;
      break;
    }
  }
  return bEmpty;
};
 /**
 * @description 添加URL参数
 * @method addURLParam
 * @param {String} strUrl URL
 * @param {String} strName 参数名
 * @param {String} strValue 参数值
 * @return {String} 添加参数后的全路径
 */
const addURLParam = (strUrl, strName, strValue) => {
  if (isStrNullOrEmpty(strUrl)) {
    return strUrl;
  }
  if (strUrl.indexOf('?') >= 0) {
    strUrl += '&' + strName + '=' + strValue;
  } else {
    strUrl += '?' + strName + '=' + strValue;
  }
  return strUrl;
}
const param = (obj) => {
  let query = '';
  let name;
  let value;
  let fullSubName;
  let subName;
  let subValue;
  let innerObj;
  let i;
  for (name in obj) {
    value = obj[name];

    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i];
        fullSubName = name + '[' + i + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += param(innerObj) + '&';
      }
    } else if (value instanceof Object) {
      // tslint:disable-next-line:forin
      for (subName in value) {
        subValue = value[subName];
        fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        query += param(innerObj) + '&';
      }
    } else if (value !== undefined && value !== null) {
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
  }
  return query.length ? query.substr(0, query.length - 1) : query;
};
/**
 * @description 将JSON对象解析为url参数（用于POST后台提交）
 * @method paramObject
 * @param {Object} 要解析的JSON对象
 * @return {String} 解析好的url参数
 */
const paramObject = (obj) => {
  if (obj == null) {
    return '';
  }
  let query = '';
  let name;
  let value;
  let fullSubName;
  let subName;
  let subValue;
  let innerObj;
  let i;
  let strTempQuery;
  // tslint:disable-next-line:forin
  for (name in obj) {
    value = obj[name];
    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) {
        subValue = value[i];
        if (subValue instanceof Object) {
          fullSubName = name + '[' + i + ']';
        } else {
          fullSubName = name;
        }
        innerObj = {};
        innerObj[fullSubName] = subValue;
        strTempQuery = paramObject(innerObj);
        if (!isStrNullOrEmpty(strTempQuery)) {
          query += strTempQuery + '&';
        }
      }
    } else if (value instanceof Object) {
      for (subName in value) {
        subValue = value[subName];
        fullSubName = name + '.' + subName;
        // fullSubName = name + '[' + subName + ']';
        innerObj = {};
        innerObj[fullSubName] = subValue;
        strTempQuery = paramObject(innerObj);
        if (!isStrNullOrEmpty(strTempQuery)) {
          query += strTempQuery + '&';
        }
      }
    } else if (value !== undefined && value !== null) {
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
  }
  return query.length ? query.substr(0, query.length - 1) : query;
};
const getToken = Cookie;
const HttpClient = {
  'get': (url, param, option) => {
    const optionGet = option || {};
    const header = Object.assign({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }, optionGet);
    // 添加时间戳，避免缓存
    const timestamp = +new Date();
    url += (url.indexOf('?') < 0 ? '?' : '&') + `timestamp=${String(timestamp)}`;
    // 处理请求参数
    if (param) {
      for (let i in param) {
        url += `&${i}=${String(param[i])}`;
      }
    }
    return axios.get(url, {
      headers: header,
    });
  },
  'post': (url, param, payload, option) => {
    let optionGet;
    if (option) {
      optionGet = option.headers || {};
    } else {
      optionGet = {};
    }
    const header = Object.assign({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }, optionGet);
    let strPayload;
    if (option && option.type === 'json') {
      strPayload = payload;
    } else {
      strPayload = paramObject(payload);
    }
    // 添加时间戳，避免缓存
    const timestamp = +new Date();
    url += (url.indexOf('?') < 0 ? '?' : '&') + `timestamp=${String(timestamp)}`;
    // 处理请求参数
    if (param) {
      let urlfoot = '';
      urlfoot += `&${param(param)}`;
      urlfoot = urlfoot.slice(1)
      urlfoot = '?' + urlfoot;
      url += urlfoot;
    }
    return axios.post(url, strPayload, {
      headers: header,
    });
  },
  'delete': (url, param, option) => {
    const optionGet = option || {};
    const header = Object.assign({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }, optionGet);
    // 添加时间戳，避免缓存
    const timestamp = +new Date();
    url += (url.indexOf('?') < 0 ? '?' : '&') + `timestamp=${String(timestamp)}`;
    // 处理请求参数
    if (param) {
      url += `&${param(param)}`;
    }
    return axios.delete(url, {
      headers: header,
    });
  },
  'put': (url, param, payload, option) => {
    const optionGet = option.headers || {};
    const header = Object.assign({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }, optionGet);
    let strPayload;
    if (option.type === 'json') {
      strPayload = payload;
    } else {
      strPayload = paramObject(payload);
    }
    // 添加时间戳，避免缓存
    const timestamp = +new Date();
    url += (url.indexOf('?') < 0 ? '?' : '&') + `timestamp=${String(timestamp)}`;
    // 处理请求参数
    if (param) {
      let urlfoot = '';
      urlfoot += `&${param(param)}`;
      urlfoot = urlfoot.slice(1)
      urlfoot = '?' + urlfoot;
      url += urlfoot;
    }
    return axios.put(url, strPayload, {
      headers: header,
    });
  },
  /**
   * @description 同步Ajax请求
   * @method ajaxRequest
   * @param {String} strUrl 访问路径
   * @param {Object} pData 请求数据
   * @param {Object} settings 其他配置，同JQuery里面的setting参数
   * @param {Boolean} bAddToken 是否在header上添加token值
   * @return {any} 服务器响应返回的数据
   */
  'ajaxRequest': (strUrl, pData, settings, bAddToken) => {
    let result = null;
    const header = {};
    // 如果是get请求，则加上时间戳，避免缓存
    if (settings && settings.type && settings.type.toUpperCase() === 'GET') {
      const strTime = (new Date()).getTime();
      strUrl = addURLParam(strUrl, 'timestamplp', strTime);
    }
    if (bAddToken) {
      header.token = getToken.getCookie('clientCliToken');
    }
    let defaultSettings = {
      type: 'post',
      url: strUrl,
      data: pData,
      async: false,
      headers: header,
      dataType: 'json',
      success: (response) => {
          result = response;
      },
    };
    defaultSettings = Object.assign(defaultSettings, settings);
    $.ajax(defaultSettings);
    return result;
  },
  /**
   * @description 上传文件请求函数
   * @method uploadRequest
   * @param {String} strUrl 请求地址
   * @param {FormData} formData 表单数据
   * @param {Function} success 成功回调函数
   * @param {Function} error 失败回调函数
   */
  'uploadRequest': function (strUrl, formData, success, error) {
    $.ajax({
      url: strUrl,
      type: 'POST',
      cache: false,
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        success(response);
      },
      error: function (response) {
        error(response);
      }
    });
  },
};

export { HttpClient };

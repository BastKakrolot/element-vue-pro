import { HttpClient } from '../plugins/HttpClient';
const isProduction = process.env.NODE_ENV === 'production';
window.UNIFY_IP = 'http://cloudwindow.gs.org/';
//单点登录服务路劲
window.LOGIN_SERVER = window.UNIFY_IP + 'gm-sso-server';
//后台管理系统路径
window.UUMS_SERVER = window.UNIFY_IP + 'uums-server/';
window.MAIN_PAGE_PATH = window.UNIFY_IP;
window.APP_KEY = 'cloudwindow-acceptance';
if (isProduction) {
  const result = HttpClient.ajaxRequest('../config.json', null, {
    type: 'get',
    responseType: 'json',
  }, false);
  if (result === null) {
    console.error('未获取json文件，请联系人员配置！')
  } else {
    result.forEach((item) => {
      window[item.name] = item.value;
    });
  }
}

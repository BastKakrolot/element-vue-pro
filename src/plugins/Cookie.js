/**
 * @enum cookie API
 */

const Cookie = {
  /**
   * @description 添加一个cookie
   * @method addCookie
   * @param {String} name cookie名称
   * @param {String} value cookie值
   * @param {Number} expiresDays 多少天后会过期
   */
  addCookie: (name, value, expiresDays) => {
    let cookieString = name + '=' + escape(value);
    if (expiresDays > 0) {
      const date = new Date();
      date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
      cookieString = cookieString + ';expires=' + date.toUTCString();
    }
    cookieString += ';path=/';
    document.cookie = cookieString;
  },

  /**
   * @method removeCookie
   * @param {String} name 要删除的cookie名称
   */
  removeCookie: (name) => {
    const date = new Date();
    date.setTime(date.getTime() - 1);
    let cookieString = name + '=temp' + ';expires=' + date.toUTCString();
    cookieString += ';path=/';
    document.cookie = cookieString;
  },
  
  /**
   * @description 获取指定名称的cookie值
   * @method getCookie
   * @param {String} name cookie名称
   * @return {String} cookie值
   */
  getCookie: (name) => {
    const strCookie = document.cookie;
    const arrCookie = strCookie.split('; ');
    for (const item of arrCookie) {
      const arr = item.split('=');
      if (arr[0] === name) {
        return unescape(arr[1]);
      }
    }
  }
}

export { Cookie };

import '../config/navi-config';
// 创建路由
let routesArray = [];
window.NAVI_CONFIG.forEach((item) => {
  if (item.children) {
    item.children.forEach((subItem) => {
      subItem.meta = {
        title: subItem.title,
      };
    });
    routesArray = routesArray.concat(item.children);
  } else {
    item.meta = {
      title: item.title,
    };
    routesArray.push(item);
  }
});
routesArray.push({
  path: '*',
  name: 'NotFound',
  title: '未找到指定网页',
  component: () => import('../views/NotFound.vue'),
  meta: {
    title: '未找到指定网页',
  },
});
routesArray.push({
  path: '/',
  redirect: window.NAVI_CONFIG.defaultPath
});

export { routesArray };

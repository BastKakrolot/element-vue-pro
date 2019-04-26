import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store'
import { routesArray } from './navi-trans';
Vue.use(Router)

const route = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routesArray,
});
// 路由前置守卫
route.beforeEach((to, from, next) => {
  store.commit({type: 'setDefaultActive', name: to.path});
  document.title = to.meta.title;
  next()
});
export default route;

import 'babel-polyfill';
import App from './App.vue';
import router from './route/router';
import store from './store/store';
import { Vue } from './element';
import './assets/css/global.less';
import './assets/font/iconfont.css';
import './config/config';
import './config/rest-url';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

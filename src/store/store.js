import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const IsPC = () => {
  let userAgentInfo = navigator.userAgent;
  let Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
export default new Vuex.Store({
  state: {
    collapse: false,
    theme: true,
    drawer: false,
    hideLeft: false,
    DicData: [{
    
    }],
    defaultActive: null,
    isPC: IsPC(),
  },
  mutations: {
    setCollapse(state, payload) {
      state.collapse = payload.bool;
    },
    setDrawer(state, payload) {
      state.drawer = payload.bool;
    },
    setHideLeft(state, payload) {
      state.hideLeft = payload.bool;
    },
    setDefaultActive(state, payload) {
      state.defaultActive = payload.name;
    },
  },
  actions: {

  },
  getters: {
    getCollapse: state => state.collapse,
    getTheme: state => state.theme,
    getDicData: state => state.DicData,
    getDefaultActive: state => state.defaultActive,
    getDrawer: state => state.drawer,
    getHideLeft: state => state.hideLeft,
    getIsPC: state => state.isPC,
  }
})

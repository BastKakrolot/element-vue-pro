<template>
  <el-container class="frame">
    <el-aside class="slider">
      <navi-menu v-if="!isHideLeft"/>
    </el-aside>
    <el-container class="content">
      <el-header class="header">
        <frame-header></frame-header>
      </el-header>
      <el-main ref="scroller" class="main">
        <transition name="component-fade" mode="out-in">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
        <frame-footer/>
      </el-main>
    </el-container>
    <return-top v-if="isInit" :scroll-box="$refs.scroller.$el"></return-top>
    <drawer v-if="isHideLeft" v-model="isDrawer" placement="left">
      <navi-menu/>
    </drawer>
  </el-container>
</template>

<script>
  import NaviMenu from '../components/NaviMenu';
  import FrameHeader from '../components/FrameHeader';
  import ReturnTop from "../components/ReturnTop";
  import Drawer from "../components/Drawer";
  import FrameFooter from "../components/FrameFooter";

  export default {
    name: 'frame',
    components: {
      FrameFooter,
      Drawer,
      ReturnTop,
      NaviMenu,
      FrameHeader,
    },
    computed: {
      isDrawer: {
        get: function () {
          return this.$store.getters.getDrawer;
        },
        set: function (value) {
          this.$store.commit({type: 'setDrawer', bool: value});
          // todo
        }
      },
      isHideLeft() {
        return this.$store.getters.getHideLeft;
      },
      isPc() {
        return this.$store.getters.getIsPC;
      }
    },
    data() {
      return {
        isInit: false,
      }
    },
    mounted() {
      this.isInit = true;
      if (!this.isPc) {
        this.$store.commit({type: 'setHideLeft', bool: true});
      }
    }
  }
</script>

<style lang="less" scoped>
  .frame{
    width: 100%;
    height: 100%;
    .slider{
      width: auto !important;
      background-color: #001529;
      box-shadow: 2px 0 6px rgba(0,21,41,.35);
      z-index: 10;
    }
    .content{
      background: #f0f2f5;
      overflow: hidden;
      .header{
        background-color: #ffffff;
        position: relative;
        z-index: 999;
        height: 64px !important;
        padding: 0;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
      }
      .main{
        overflow: auto;
        .component-fade-enter-active, .component-fade-leave-active {
          transition: opacity .2s ease;
        }
        .component-fade-enter, .component-fade-leave-to
          /* .component-fade-leave-active for below version 2.1.8 */ {
          opacity: 0;
        }
      }
    }
  }
</style>

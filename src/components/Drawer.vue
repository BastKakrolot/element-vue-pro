<template>
  <div class="drawer">
    <transition :name="placement">
      <div class="drawer-box" v-if="value" :class="placement">
        <slot></slot>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-if="value" @click="close"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Drawer",
    props: {
      placement: {
        default: 'left',
      },
      maskClose: {
        default: true,
      },
      value: {
        default: false
      }
    },
    methods: {
      close() {
        if (this.maskClose) {
          this.$emit('input', false);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .drawer{
    position: absolute;
    .drawer-box{
      background: #fff;
      z-index: 9999;
      overflow: auto;
    }
    .mask{
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 9998;
      background: rgba(0,0,0,0.3);
    }
    .left{
      position: fixed;
      height: 100% !important;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.3);
      top: 0;
      left: 0;
      min-width: 250px;
    }
    .right{
      position: fixed;
      height: 100% !important;
      box-shadow: 0 2px 6px rgba(0, 21, 41, 0.3);
      top: 0;
      right: 0;
      min-width: 250px;
    }
    .bottom{
      position: fixed;
      width: 100% !important;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.3);
      bottom: 0;
      left: 0;
      min-height: 200px;
    }
    .top{
      position: fixed;
      width: 100%  !important;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.3);
      top: 0;
      left: 0;
      min-height: 200px;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  /*.slide-enter-active, .slide-leave-active {*/
  /*  transition: left .5s;*/
  /*  left: 0;*/
  /*}*/
  /*.slide-enter, .slide-leave-to !* .fade-leave-active below version 2.1.8 *! {*/
  /*  left: -500px;*/
  /*}*/
  .left-enter /* .fade-leave-active below version 2.1.8 */ {
    left: -500px !important;
  }
  .left-enter-active{
    transition: all ease-in .2s;
  }
  .left-leave-to {
    left: 0 !important;
  }
  .left-leave{
    left: 0 !important;
  }
  .left-leave-active{
    transition: all ease-in .2s;
  }
  .left-leave-to{
    left: -500px !important;
  }
  .right-enter /* .fade-leave-active below version 2.1.8 */ {
    right: -500px !important;
  }
  .right-enter-active{
    transition: all ease-in .2s;
  }
  .right-leave-to {
    right: 0 !important;
  }
  .right-leave{
    right: 0 !important;
  }
  .right-leave-active{
    transition: all ease-in .2s;
  }
  .right-leave-to{
    right: -500px !important;
  }
  .top-enter /* .fade-leave-active below version 2.1.8 */ {
    top: -500px !important;
  }
  .top-enter-active{
    transition: all ease-in .2s;
  }
  .top-leave-to {
    top: 0 !important;
  }
  .top-leave{
    top: 0 !important;
  }
  .top-leave-active{
    transition: all ease-in .2s;
  }
  .top-leave-to{
    top: -500px !important;
  }
  .bottom-enter /* .fade-leave-active below version 2.1.8 */ {
    bottom: -500px !important;
  }
  .bottom-enter-active{
    transition: all ease-in .2s;
  }
  .bottom-leave-to {
    bottom: 0 !important;
  }
  .bottom-leave{
    bottom: 0 !important;
  }
  .bottom-leave-active{
    transition: all ease-in .2s;
  }
  .bottom-leave-to{
    bottom: -500px !important;
  }
</style>

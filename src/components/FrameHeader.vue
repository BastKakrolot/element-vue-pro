<template>
  <div class="frame-header">
    <div v-if="!isHideLeft" class="collapse" @click="changeSlider">
      <a-icon :type="isCollapse ? 'indent' : 'outdent'"></a-icon>
    </div>
    <div v-if="isHideLeft" class="collapse" @click="changeDrawer">
      <a-icon :type="isDrawer ? 'indent' : 'outdent'"></a-icon>
    </div>
    <div class="user-wrapper">
      <div class="setting-icon">
        <a-icon type="question-circle"></a-icon>
      </div>
      <div class="setting-icon">
        <i class="el-icon-share"></i>
      </div>
      <el-popover
        placement="top-end"
        trigger="click"
        @show="isDestroy = true"
        @hide="isDestroy = false">
        <pending-box v-if="isDestroy"></pending-box>
        <div slot="reference" class="setting-icon">
          <el-badge :value="12" class="item">
            <i class="el-icon-bell"></i>
          </el-badge>
        </div>
      </el-popover>
      <el-dropdown placement="bottom">
        <div class="user-box">
          <img src="../assets/img/logo.png" />
          <span>BastKakrolot</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>账户设置</el-dropdown-item>
          <el-dropdown-item disabled>测试设置</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
  import PendingBox from './PendingBox';
  import $ from 'jquery';
  export default {
    name: "FrameHeader",
    data: function() {
      return {
        isDestroy: false,
        isFirstSmall: true,
        isFirstlarge: true,
      };
    },
    components: {
      PendingBox,
    },
    computed: {
      isCollapse: function () {
        return this.$store.getters.getCollapse;
      },
      isDrawer() {
        return this.$store.getters.getDrawer;
      },
      isHideLeft() {
        return this.$store.getters.getHideLeft;
      },
      isPc() {
        return this.$store.getters.getIsPC;
      }
    },
    methods: {
      changeSlider: function() {
        this.$store.commit({type: 'setCollapse', bool: !this.isCollapse});
      },
      changeDrawer: function () {
        this.$store.commit({type: 'setDrawer', bool: !this.isDrawer});
      }
    },
    mounted() {
      $(window).resize(() => {
        if (this.isPc) {
          if (window.innerWidth > 1200) {
            if (this.isFirstlarge) {
              this.$store.commit({type: 'setCollapse', bool: false});
              this.isFirstSmall = true;
              this.isFirstlarge = false;
              this.$store.commit({type: 'setHideLeft', bool: false});
            }
          } else if (window.innerWidth > 500) {
            if (this.isFirstSmall) {
              this.$store.commit({type: 'setCollapse', bool: true});
              this.isFirstlarge = true;
              this.isFirstSmall = false;
              this.$store.commit({type: 'setHideLeft', bool: false});
            }
          } else {
            this.isFirstSmall = true;
            this.isFirstlarge = true;
            this.$store.commit({type: 'setHideLeft', bool: true});
            this.$store.commit({type: 'setCollapse', bool: false});
          }
        } else {
          this.isFirstSmall = true;
          this.isFirstlarge = true;
          this.$store.commit({type: 'setHideLeft', bool: true});
          this.$store.commit({type: 'setCollapse', bool: false});
        }
      });
    }
  }
</script>

<style lang="less" scoped>
  .frame-header{
    .collapse{
      width: 64px;
      height: 64px;
      float: left;
      line-height: 64px;
      text-align: center;
      i{
        font-size: 23px;
      }
      &:hover{
        background-color: rgba(0,0,0,.025);
        cursor: pointer;
      }
    }
    .user-wrapper{
      float: right;
      height: 64px;
      margin-right: 20px;
      .setting-icon{
        width: 50px;
        height: 64px;
        float: left;
        /*line-height: 64px;*/
        text-align: center;
        >i{
          line-height: 64px;
        }
        .item{
          height: 30px;
          margin: 16px 0;
          i{
            line-height: 30px;
          }
        }
        &:hover{
          background-color: rgba(0,0,0,.025);
          cursor: pointer;
        }
      }
      .user-box{
        height: 64px;
        cursor: pointer;
        img{
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: block;
          margin: 16px 10px;
          float: left;
        }
        span{
          line-height: 64px;
          color: #555;
        }
      }
    }
  }
</style>

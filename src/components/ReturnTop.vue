<template>
  <transition name="el-fade-in">
    <div class="page-up" @click="scrollToTop" v-show="toTopShow">
      <el-tooltip effect="dark" content="回到顶部" placement="left">
        <i class="el-icon-caret-top"></i>
      </el-tooltip>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "ReturnTop",
    data() {
      return {
        toTopShow: false,
      }
    },
    props: {
      scrollBox: {
        required: true,
      }
    },
    methods: {
      handleScroll: function() {
        this.scrollTop = this.scrollBox.scrollTop;
        if (this.scrollTop > 300) {
          this.toTopShow = true;
        }else {
          this.toTopShow = false;
        }
      },
      scrollToTop: function() {
        let timer = null;
        let _this = this;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
          if (_this.scrollTop > 5000) {
            _this.scrollTop -= 1000;
            _this.scrollBox.scrollTop = _this.scrollTop;
            timer = requestAnimationFrame(fn);
          } else if (_this.scrollTop > 1000 && _this.scrollTop <= 5000) {
            _this.scrollTop -= 500;
            _this.scrollBox.scrollTop = _this.scrollTop;
            timer = requestAnimationFrame(fn);
          } else if (_this.scrollTop > 200 && _this.scrollTop <= 1000) {
            _this.scrollTop -= 100;
            _this.scrollBox.scrollTop = _this.scrollTop;
            timer = requestAnimationFrame(fn);
          } else if (_this.scrollTop > 50 && _this.scrollTop <= 200) {
            _this.scrollTop -= 10;
            _this.scrollBox.scrollTop = _this.scrollTop;
            timer = requestAnimationFrame(fn);
          } else if (_this.scrollTop > 0 && _this.scrollTop <= 50) {
            _this.scrollTop -= 5;
            _this.scrollBox.scrollTop = _this.scrollTop;
            timer = requestAnimationFrame(fn);
          } else {
            cancelAnimationFrame(timer);
            _this.toTopShow = false;
          }
        });
      },
    },
    mounted() {
      this.$nextTick(function () {
        window.addEventListener('scroll', this.handleScroll,true);
      });
    },
    destroyed() {
      window.addEventListener('scroll', this.handleScroll,true);
    }
  }
</script>

<style lang="less" scoped>
  .page-up{
    background-color: #409eff;
    position: fixed;
    right: 50px;
    bottom: 30px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
    opacity: .5;
    z-index: 100;
    .el-icon-caret-top{
      color: #fff;
      display: block;
      line-height: 40px;
      text-align: center;
      font-size: 18px;
    }
    p{
      display: none;
      text-align: center;
      color: #fff;
    }
    &:hover{
      opacity: 1;
    }
  }
</style>

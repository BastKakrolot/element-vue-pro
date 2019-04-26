<template>
  <div class="footer">
    <div>
      <a-icon @click="goGitHub" type="github-fill"/>
    </div>
    <div>
      <span>Copyright <a-icon type="copyright"/> 2019 Kakrotol</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FrameFooter",
    methods: {
      goGitHub() {
        window.open('https://github.com/BastKakrolot');
      }
    }
  }
</script>

<style lang="less" scoped>
  .footer{
    margin-top: 100px;
    margin-bottom: 50px;
    text-align: center;
    >div{
      &:nth-child(1) {
        margin-bottom: 10px;
        i{
          font-size: 30px;
          color: #a2a2a2;
          cursor: pointer;
          transition: color .5s;
          &:hover{
            color: #000;
          }
        }
      }
      &:nth-child(2) {
        span{
          color: #a2a2a2;
          font-size: 12px;
          i{
            font-size: 12px;
          }
        }
      }
    }
  }
</style>

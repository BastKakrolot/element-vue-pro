<template>
  <div class="pending-box" v-loading="isLoading">
    <el-tabs value="first">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "pendingBox",
    data: function () {
      return {
        isLoading: false,
      };
    },
    mounted() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }
</script>

<style lang="less" scoped>
  .pending-box{
    padding: 15px 10px;
  }
</style>

<template>
  <div id="app">
    <gmFrame></gmFrame>
  </div>
</template>

<script>
  import gmFrame from './views/Frame.vue';
  export default {
    components: {
      gmFrame,
    }
  }
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>

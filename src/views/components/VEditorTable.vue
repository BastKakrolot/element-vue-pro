<template>
  <div class="veditor-table">
    <div>
      <veditor @change="handleChange"/>
    </div>
    <div>
      <h2>显示</h2>
      <veditor-view :value="innerHtml"/>
    </div>
  </div>
</template>

<script>
  import Veditor from "../../components/Veditor";
  import VeditorView from "../../components/VeditorView";
  export default {
    name: "VEditorTable",
    components: {VeditorView, Veditor},
    data() {
      return {
        innerHtml: null,
      }
    },
    methods: {
      handleChange(state) {
        this.innerHtml = state.getHTML();
      }
    }
  }
</script>

<style lang="less" scoped>
  .veditor-table{
    >div{
      &:nth-child(1) {
        margin-bottom: 20px;
      }
    }
  }
</style>

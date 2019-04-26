<template>
  <i class="icon" @click="click" :class="iconClass">
    <slot></slot>
  </i>
</template>

<script>
  export default {
    name: "AntIcon",
    props: {
      type: String,
    },
    methods: {
      click(item) {
        this.$emit('click', item);
      }
    },
    computed: {
      iconClass: function () {
        return `icon-${this.type}`;
      }
    }
  }
</script>

<style lang="less" scoped>

</style>

<template>
  <div class="dict">
    <el-select
      :value="value"
      :placeholder="placeholder"
      :filterable="filterable"
      :popper-append-to-body="popperAppendToBody"
      :clearable="clearable"
      :disabled="disabled"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <el-option
        v-for="item in dicData"
        :key="changeNum(item.value)"
        :label="item.label"
        :value="changeNum(item.value)"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "Dict",
    props: {
      // 是否开启过滤
      filterable: {
        type: Boolean,
        default: false,
      },
      // 是否绑定到body
      popperAppendToBody: {
        type: Boolean,
        default: true,
      },
      // 双向绑定值
      value: {
      },
      // 是否显示清空按钮
      clearable: {
        type: Boolean,
        default: false,
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false,
      },
      // 占位提示
      placeholder: {
        type: String,
        default: '请选择',
      },
      // 字典类型
      dicType: {
        type: String,
        default: '',
      },
      // 是否转化为string 默认为number
      isString: {
        type: Boolean,
        default: false,
      },
      // 多选
      multiple: {
        type: Boolean,
        default: false,
      },
    },
    data: function() {
      return {
        dicData: [],
        dicObj: this.$store.getters.getDicData,
      }
    },
    methods: {
      handleChange: function(value) {
        this.$emit('input', value);
        this.$emit('change', value);
      },
      changeNum: function(item) {
        if (this.isString) {
          return item;
        } else {
          return parseInt(item, 10);
        }
      },
      handleBlur: function() {
        this.$emit('blur');
      },
      handleFocus: function() {
        this.$emit('focus');
      },
    },
    mounted: function() {
      if (this.dicObj[this.dicType]) {
        this.dicData = this.dicObj[this.dicType];
      } else {
        this.dicData = [{label: '数据字典不存在', value: 0 }];
      }
      // do someting
    },
  }
</script>

<style lang="less" scoped>
  .dict{
    width: 100%;
  }
</style>

<template>
  <div class="dic-select">
    <el-card class="des" shadow="never">
      <div class="component-name">
        <span class="name-big">Dict</span>
        <span class="name-use">dict</span>
        <span class="name-link">
            <el-tooltip class="item" effect="dark" content="信息" placement="top">
              <a-icon type="info-circle"></a-icon>
            </el-tooltip>
          </span>
      </div>
      <div class="component-attributes">
        <span>Attributes</span>
        <span>属性</span>
      </div>
      <el-table
        :data="tableData1"
        style="width: 100%">
        <el-table-column
          prop="prop"
          label="属性">
        </el-table-column>
        <el-table-column
          prop="required"
          label="必填性">
        </el-table-column>
        <el-table-column
          prop="description"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="chooseValue"
          label="可选值">
        </el-table-column>
        <el-table-column
          prop="defalut"
          label="默认值">
        </el-table-column>
      </el-table>
      <div class="component-attributes">
        <span>Method</span>
        <span>方法</span>
      </div>
      <el-table
        :data="tableData2"
        style="width: 100%">
        <el-table-column
          prop="method"
          label="方法">
        </el-table-column>
        <el-table-column
          prop="description"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="prop"
          label="参数">
        </el-table-column>
        <el-table-column
          prop="return"
          label="返回值">
        </el-table-column>
      </el-table>
      <div class="des-item">
        <span>以下为用例！</span>
      </div>
      <el-button @click="goIconfont" type="primary"><a-icon type="star"></a-icon>Element</el-button>
    </el-card>
    <el-card class="dict-card" shadow="never">
      <dict
        class="dict-body"
        dic-type="性别"
        :disabled="isDisabled"
        :filterable="isFilterable"
        :clearable="isClearable"
        :is-string="isIsString"
        :multiple="isMultiple"
        v-model="item"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div class="dict-setting">
        <el-checkbox v-model="isFilterable" label="filterable" border></el-checkbox>
        <el-checkbox v-model="isClearable" label="clearable" border></el-checkbox>
        <el-checkbox v-model="isDisabled" label="disabled" border></el-checkbox>
        <el-checkbox v-model="isIsString" label="isString" border></el-checkbox>
        <el-checkbox v-model="isMultiple" label="multiple" border></el-checkbox>
      </div>
      <div class="dict-type">
        <span>类型:</span>
        <span>性别</span>
      </div>
      <div class="dict-value">
        <span>值:</span>
        <span>{{item}}</span>
      </div>
      <div class="dict-value">
        <span>动作:</span>
        <span><el-button v-if="message.length > 0" @click="message = []" type="primary">clean</el-button></span>
      </div>
      <div v-for="(item, index) in message" :key="index" class="dict-value">
        {{item}}
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "DicSelect",
    data() {
      return {
        isDisabled: false,
        isFilterable: false,
        isClearable: false,
        isIsString: false,
        isMultiple: false,
        message: [],
        tableData1: [
          {
            prop: 'v-model',
            required: 'true',
            description: '双向绑定值',
            type: 'string/number',
            chooseValue: '\t—',
            defalut: '\t—',
          },
          {
            prop: 'popper-append-to-body',
            required: '\t—',
            description: '是否绑定到body',
            type: 'boolean',
            chooseValue: '\t—',
            defalut: 'true',
          },
          {
            prop: 'filterable',
            required: '\t—',
            description: '是否开启过滤',
            type: 'boolean',
            chooseValue: '\t—',
            defalut: 'false',
          },
          {
            prop: 'clearable',
            required: '\t—',
            description: '是否显示清空按钮',
            type: 'boolean',
            chooseValue: '\t—',
            defalut: 'false',
          },
          {
            prop: 'disabled',
            required: '\t—',
            description: '是否禁用',
            type: 'boolean',
            chooseValue: '\t—',
            defalut: 'false',
          },
          {
            prop: 'placeholder',
            required: '\t—',
            description: '占位提示',
            type: 'string',
            chooseValue: '\t—',
            defalut: '请选择',
          },
          {
            prop: 'dicType',
            required: 'true',
            description: '字典类型',
            type: 'string',
            chooseValue: '\t—',
            defalut: '\t—',
          },
          {
            prop: 'is-string',
            required: '\t—',
            description: '是否转化为string, 默认为number',
            type: 'boolean',
            chooseValue: '\t—',
            defalut: 'false',
          },
          {
            prop: 'multiple',
            required: '\t—',
            description: '多选',
            type: 'boolean',
            chooseValue: '\t—',
            defalut: 'false',
          },
        ],
        tableData2: [
          {
            method: 'change',
            description: '值改变触发',
            prop: 'value',
            return: '\t—',
          },
          {
            method: 'blur',
            description: '失去焦点时触发',
            prop: '\t—',
            return: '\t—',
          },
          {
            method: 'focus',
            description: '获得焦点时触发',
            prop: '\t—',
            return: '\t—',
          },
        ],
        item: null,
      };
    },
    methods: {
      goIconfont() {
        window.open('https://element.eleme.cn/#/zh-CN/component/installation');
      },
      handleChange(value) {
        this.message.push(`change-value:${value}`);
      },
      handleFocus() {
        this.message.push('focus');
      },
      handleBlur() {
        this.message.push('blur');
      }
    }
  }
</script>

<style lang="less" scoped>
 .dic-select{
 }
</style>

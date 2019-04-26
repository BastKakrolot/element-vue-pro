<template>
  <div class="ex-icon">
    <div>
      <el-card class="des" shadow="never">
        <div class="component-name">
          <span class="name-big">Drawer</span>
          <span class="name-use">drawer</span>
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
          :data="tableData"
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
      </el-card>
      <el-card class="card-box" shadow="never">
        <div class="card-item">
          <el-button type="primary" @click="openDrawer">打开抽屉</el-button>
        </div>
        <div class="card-item">
          <span>
            placement:
          </span>
          <el-select
            v-model="drawerPlacement"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="card-item">
          <el-checkbox v-model="isMaskClose" label="mask-close" border></el-checkbox>
        </div>
        <drawer
          v-model="isVisibily"
          :placement="drawerPlacement"
          :mask-close="isMaskClose"
        >
          <div
            class="drawer-box"
            :class="drawerPlacement === 'left' || drawerPlacement === 'right' ? 'drawer-box-left-right' : 'drawer-box-top-bottom'">
            <div class="drawer-header">
              <span>抽屉</span>
            </div>
            <div class="drawer-center">
              <span>这是一个抽屉</span>
            </div>
            <div class="drawer-footer">
              <el-button type="primary" @click="close">close</el-button>
            </div>
          </div>
        </drawer>
      </el-card>
    </div>
  </div>
</template>

<script>
  import Drawer from "../../components/Drawer";
  export default {
    name: "DrawerTable",
    components: {Drawer},
    data() {
      return {
        isVisibily: false,
        drawerPlacement: 'left',
        isMaskClose: true,
        tableData: [{
          prop: 'v-model',
          required: 'true',
          description: '是否显示',
          type: 'boolean',
          chooseValue: '\t—',
          defalut: '\t—',
        }, {
          prop: 'placement',
          required: 'false',
          description: '位置',
          type: 'string',
          chooseValue: 'left\t—top\t—right\t—bottom',
          defalut: 'left',
        }, {
          prop: 'mask-close',
          required: 'false',
          description: 'mask是否关闭',
          type: 'boolean',
          chooseValue: '\t—',
          defalut: 'true',
        }],
        options: [{
          value: 'left',
          label: '左'
        }, {
          value: 'top',
          label: '上'
        }, {
          value: 'right',
          label: '右'
        }, {
          value: 'bottom',
          label: '下'
        }],
      }
    },
    methods: {
      openDrawer() {
        this.isVisibily = true;
      },
      close() {
        this.isVisibily = false;
      }
    }
  }
</script>

<style lang="less" scoped>
  .drawer-box-top-bottom{
    width: calc(100% - 40px);
    height: 400px;
  }
  .drawer-box-left-right{
    width: 400px;
    height: calc(100% - 40px);
  }
  .drawer-box{
    padding: 20px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    .drawer-header {
      flex: none;
      padding: 0 0 5px 10px;
      margin: 10px 0;
      border-bottom: 1px solid #ccc;
      span{
        font-size: 20px;
        font-weight: bold;
      }
    }
    .drawer-center{
      flex: 1;
    }
    .drawer-footer{
      flex: none;
      text-align: center;
    }
  }
</style>

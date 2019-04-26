<template>
  <div class="ex-icon">
    <div>
      <el-card class="des" shadow="never">
        <div class="component-name">
          <span class="name-big">AIcon</span>
          <span class="name-use">a-icon</span>
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
        <div class="des-item">
          <span>以下为扩展图标，单击即可复制！</span>
        </div>
        <el-button @click="goIconfont" type="primary"><a-icon type="star"></a-icon>Ant-Design</el-button>
      </el-card>
      <card-group></card-group>
    </div>
  </div>
</template>

<script>
  import CardGroup from '../../components/dashboard/CardGroup';
  export default {
    name: "Fxy",
    components: {
      CardGroup,
    },
    data() {
      return {
        tableData: [{
          prop: 'type',
          required: 'true',
          description: '图标类名',
          type: 'string',
          chooseValue: '\t—',
          defalut: '\t—',
        }]
      }
    },
    methods: {
      goIconfont() {
        window.open('https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.de12df413&cid=9402');
      }
    }
  }
</script>

<style lang="less" scoped>
  .ex-icon{

  }
</style>

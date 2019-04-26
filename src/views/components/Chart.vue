<template>
  <div class="charts">
    <el-card class="des" shadow="never">
      <div class="component-name">
        <span class="name-big">EChart</span>
        <span class="name-use">e-chart</span>
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
        <span>Ref</span>
        <span>组件公共方法</span>
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
        <span>以下为基础图例！</span>
      </div>
      <el-button @click="goIconfont" type="primary"><a-icon type="star"></a-icon>E-Chart</el-button>
    </el-card>
    <e-chart id="demo1" :option="option1"></e-chart>
    <e-chart id="demo2" :option="option2"></e-chart>
    <e-chart id="demo3" :option="option3"></e-chart>
  </div>
</template>

<script>
  export default {
    name: "Jky",
    data() {
      return {
        option1: {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {},
            smooth: true,
          }]
        },
        option2: {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        },
        option3: {
          title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        },
        tableData1: [
          {
            prop: 'id',
            required: 'true',
            description: '指定唯一的id',
            type: 'string',
            chooseValue: '\t—',
            defalut: '\t—',
          },
          {
            prop: 'option',
            required: 'true',
            description: '图表配置，详情配置参考e-charts官网',
            type: 'object',
            chooseValue: '\t—',
            defalut: '\t—',
          },
        ],
        tableData2: [
          {
            method: 'resize()',
            description: '重置图表大小',
            prop: '\t—',
            return: '\t—',
          },
          {
            method: 'destroyCharts()',
            description: '销毁图表',
            prop: '\t—',
            return: '\t—',
          },
          {
            method: 'getCharts()',
            description: '获取当前图表实例',
            prop: '\t—',
            return: '当前图标实例',
          },
        ]
      };
    },
    methods: {
      goIconfont() {
        window.open('https://www.echartsjs.com/api.html#echarts');
      }
    }
  }
</script>

<style lang="less" scoped>
  .charts{
    #demo1, #demo2, #demo3{
      background-color: #fff;
      height: 500px;
      margin: 20px 0;
    }
  }
</style>

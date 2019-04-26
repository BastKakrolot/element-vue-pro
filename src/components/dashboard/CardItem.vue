<template>
  <div class="card-item">
    <div class="item-header">
      <div class="header-title">总销售额</div>
      <a-icon type="info-circle"></a-icon>
    </div>
    <div class="item-content">
      ￥126,560
    </div>
    <div class="item-charts">
      <e-chart id="chart" :option="option"></e-chart>
    </div>
    <div class="item-footer"></div>
  </div>
</template>

<script>
  export default {
    name: "CardItem",
    data() {
      return {
        option: {
          title: {
            show: false
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          toolbox: {
            show: false,
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              areaStyle: {},
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              areaStyle: {},
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'视频广告',
              type:'line',
              stack: '总量',
              areaStyle: {},
              data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
              name:'直接访问',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {normal: {}},
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .card-item{
    .item-header{
      display: flex;
      .header-title{
        flex: 1;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0,0,0,.45);
      }
      i{
        flex: none;
        color: rgba(0,0,0,.45);
        font-size: 16px;
        line-height: 22px;
      }
    }
    .item-content{
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
      color: #000;
      margin-top: 4px;
      margin-bottom: 0;
      font-size: 30px;
      line-height: 38px;
      height: 38px;
    }
    .item-charts{
      #chart{
        height: 250px;
        width: 100%;
      }
    }
  }
</style>

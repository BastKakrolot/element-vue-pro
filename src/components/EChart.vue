<template>
  <div class="e-chart" :id="id"></div>
</template>

<script>
  import * as echarts from 'echarts';
  import $ from 'jquery';
  export default {
    name: "EChart",
    props: {
      option: {
        required: true,
      },
      id: {
        required: true,
      }
    },
    computed: {
      isCollapse: function () {
        return this.$store.getters.getCollapse;
      }
    },
    data() {
      return {
        eChart: null,
      }
    },
    watch: {
      option: {
        deep: true,
        handler: 'darwChart',
      },
      isCollapse: function () {
        setTimeout(() => {
          this.resize();
        }, 300);
      }
    },
    methods: {
      /**
       * @description 画图
       * @method darwChart
       */
      darwChart: function() {
        this.eChart = echarts.init(document.getElementById(this.id));
        this.eChart.setOption(this.option);
      },
      /**
       * @description 重置大小
       * @method resize
       */
      resize() {
        this.eChart.resize();
      },
      /**
       * @description 销毁图表
       * @method destroyCharts
       */
      destroyCharts() {
        echarts.dispose(this.eChart);
      },
      /**
       * @description 获取当前图表实例
       * @method getCharts
       * @returns {*} 实例
       */
      getCharts() {
        return echarts.getInstanceByDom(this.eChart);
      }
    },
    mounted() {
      this.darwChart();
      $(window).resize(() => {
        this.resize();
      });
    }
  }
</script>
<style lang="less" scoped>
  .e-chart{
    display: block;
    padding: 20px;
  }
</style>

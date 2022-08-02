<template>
  <div id="main"></div>
</template>

<script setup>
import chinaJSON from '@/assets/json/china.json'
import { onMounted } from 'vue'
import * as echarts from 'echarts'

onMounted(() => {
  let myChart = echarts.init(document.getElementById('main'))
  myChart.showLoading()
  echarts.registerMap('China', chinaJSON)
  myChart.setOption(options)
  myChart.hideLoading()
})

let options = {
  title: {
    text: '前端监控可视化地图',
    left: 'center',
    textStyle: {
      color: '#fff',
    },
  },
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: '前端监控可视化地图',
      type: 'map',
      map: 'China',
      label: {
        show: false,
      },
      zoom: '1.3',
      top: '200',
      itemStyle: {
        label: {
          show: false, //默认是否显示省份名称
        },
        borderWidth: 2, //地图边界大小
        borderColor: '#ffffff', //地图边界颜色
        borderType: 'dashed',
        areaColor: 'rgba(233, 236, 240)',
      },
      emphasis: {
        itemStyle: { areaColor: '#3f6ed1' },
      },
    },
  ],
}
</script>

<style scoped>
#main {
  width: 800px;
  height: 800px;
}
</style>

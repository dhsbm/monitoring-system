<template>
  <div ref="pieChart" style="width: 50rem; height: 30rem"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { defineProps, toRef, watch, ref } from 'vue'
import GetSeries from './GetSeries.js'
let pieChart = ref()

const props = defineProps({
  titleOption: String,
  xAxisOption: Array,
  yAxisOption: Array,
  data: Array,
})
let err = toRef(props, 'data')

watch(
  () => err,
  () => {
    let series = GetSeries(props.xAxisOption, props.yAxisOption, err.value, 'line', 'Total')
    if (err.value?.length) {
      let myChart = echarts.init(pieChart.value)
      let option = {
        title: {
          text: props.titleOption,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: props.yAxisOption,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.xAxisOption,
        },
        yAxis: {
          type: 'value',
        },
        series: series,
      }
      myChart.setOption(option)
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<style scoped lang="scss"></style>

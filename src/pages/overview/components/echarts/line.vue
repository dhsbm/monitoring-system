<template>
  <div class="container">
    <div ref="pieChart" style="height: 30rem"></div>
    <div class="select">
      <div
        v-for="(item, i) in range"
        :key="i"
        :style="timeIndex == i ? ` background-color:white;color:blue` : ``"
        @click="timeIndex != i && emits(`changeX`, kind, index, i)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { defineProps, toRef, watch, ref } from 'vue'
import GetSeries from './GetSeries.js'
let pieChart = ref()
const props = defineProps<{
  titleOption: string
  xAxisOption: string[]
  yAxisOption: string[]
  data: number[][]
  kind: number
  index: number
  timeIndex: number
}>()
const emits = defineEmits(['changeX'])

let err = toRef(props, 'data')
const range = ['最近4小时', '最近1天', '最近7天', '最近14天', '最近30天']
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

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  .select {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 1rem 6rem;
    background-color: #eee;
    outline: 2px solid #eee;
    & > div {
      font-size: 14px;
      box-sizing: border-box;
      width: 20%;
      line-height: 30px;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: white;
      }
    }
  }
}
</style>

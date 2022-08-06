<template>
  <div ref="pieChart" style="width: 30rem; height: 30rem"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { defineProps, toRef, watch, ref } from 'vue'

let pieChart = ref()
const props = defineProps({
  titleOption: String,
  item: Array,
  data: Array,
})
let data = toRef(props, 'data')

function getData(data, item) {
  let ans = []
  for (let i = 0; i < item.length; i++) {
    let t = {}
    t.value = data[i]
    t.name = item[i]
    ans.push(t)
  }
  return ans
}
console.log(props.titleOption)
watch(
  () => data,
  () => {
    if (data.value.length) {
      let pieData = getData(props.data, props.item)
      console.log(pieData)
      let myChart = echarts.init(pieChart.value)
      let option = {
        title: {
          text: props.titleOption,
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: props.titleOption,
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
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

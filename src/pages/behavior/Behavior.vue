<template>
  <div>
    <Search ref="se" v-model:url="curReqCondition.url" @myclick="searchData"/>
    <div class="block" style="margin: 10px 10px 10px; height: 30px; border: 1px black">
      <el-select v-model="curWebId" class="m-2" placeholder="Select" style="float: left; width: 150px">
        <el-option v-for="item in WebIdOption" :key="item" :value="item" />
      </el-select>
      <el-input style="width: 200px; margin-left: 20px" v-model="curIp" placeholder="ip查询" />
      <el-date-picker
        style="float: right"
        v-model="dateSelect"
        value-format="YYYY-MM-DD HH:mm:ss"
        type="datetimerange"
        dateType="time"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </div>
    <div  class="errorList">
      <el-table :data="behData" style="width: 100%; text-align: left">
        <el-table-column fixed prop="log_id" label="日志编号" width="80" />
        <el-table-column prop="time" label="时间" width="150" />
        <el-table-column prop="url" label="路径" width="360" />
        <el-table-column prop="duration" label="持续时间(ms)" width="240" />
        <el-table-column prop="ip" label="ip" width="240" />
        <el-table-column prop="area" label="地区" />
      </el-table>
    </div>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:currentPage="currentPage1"
        v-model:page-size="pageSize"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next, jumper"
        style="margin: auto"
        :total="length1"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Area, BehLogShow } from '@/interface/index'
import { reqBeh } from '@/api/index'
import { ref, onMounted, watch } from 'vue'
import Search from './components/Search.vue'
let curErrorKind = ref() //当前错误类型
let small = ref(false)
let background = ref(false)
let disabled = ref(false)
let currentPage1 = ref(1)
let pageSize = ref(10)
let length1 = ref() //展示数据的长度
let dateSelect = ref() //挑选的时间段
let WebIdOption = ref() as any //该用户所有网站ID
let curWebId = ref() //当前网站ID
let behData = ref()
let curReqOption = ref() //当前选择的查询条件
let curIp = ref()
let curReqCondition = ref({
  url: '',
  time: '',
  ip: '',
  duration: '',
}) as any //当前选择的查询条件
curWebId.value = 1 //初始化当前网站id
curErrorKind.value = '全部' //默认错误类型
const getWebOption = () => {
  WebIdOption.value = ['1', '2', '3']
} //当前用户的网站列表从pinia拿
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  currentPage1.value = val
  reqBehData(val)
} //改变页数
const switchStamp = (nS: any) => {
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
} //时间搓转换
const searchData = () => {
  currentPage1.value = 1
  reqBehData(1)
}
const reqBehData = (page: number) => {
  reqBeh({
    web_id: curWebId.value,
    page: page,
    condition: curReqCondition,
  }).then((res) => {
    console.log(res)
    behData.value = res.data.logs
    length1.value = res.data.total
    behData.value.map(function (element: any) {
      let index: number = element.area
      let arr: BehLogShow = element
      arr.time = switchStamp(arr.time)
      arr.area = Area[index]
      return element
    })
  })
} //请求数据
reqBehData(1)
getWebOption()
onMounted(() => {

})
watch(dateSelect, (newVal) => {
  let startTime = new Date(newVal[0]).getTime()
  let endTime = new Date(newVal[1]).getTime()
  let time = startTime + '_' + endTime
  curReqCondition._rawValue.time = time
  currentPage1.value = 1
  reqBehData(currentPage1.value)
})
//监听日期  变化后更新数据
watch(curWebId, () => {
  currentPage1.value = 1
  reqBehData(currentPage1.value)
})
watch(curIp, (newVal) => {
  curReqCondition._rawValue.ip = newVal
  searchData()
})

</script>

<style lang="scss" scoped>

</style>

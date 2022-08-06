<template>
  <div>
    <Search v-model:url="curReqCondition.message" @myclick="searchData"/>
    <!-- 搜索框 -->
    <div class="block" style="margin: 10px 10px 10px; height: 30px; border: 1px black">
      <el-select v-model="curWebId" class="m-2" placeholder="Select" style="float: left; width: 150px">
        <el-option v-for="item in WebIdOption" :key="item" :value="item" /> </el-select
      ><!-- 网站id选择 -->
      <el-select
        v-model="curErrorKind"
        class="m-2"
        placeholder="Select"
        style="float: left; margin-left: 10px; width: 100px"
      >
        <el-option v-for="item in errorOption" :key="item" :value="item" /> </el-select
      ><!-- 错误类型选择 -->
      <el-input style="width: 200px; margin-left: 20px" v-model="curUrl" placeholder="路径查询" />
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
      /><!-- 时间选择 -->
    </div>
    <div  class="errorList">
      <el-table :data="errorData" style="width: 100%; text-align: left">
        <el-table-column fixed prop="log_id" label="日志编号" width="80" />
        <el-table-column prop="time" label="时间" width="150" />
        <el-table-column prop="url" label="路径" width="150" />
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column prop="message" label="信息" width="360" />
        <el-table-column prop="selector" label="选择器" width="240" />
        <el-table-column prop="stack" label="原因" /> </el-table
      ><!-- 数据显示 -->
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
      /><!-- 分页 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Type, errLogShow, ErrLog } from '@/interface/index'
import { reqErr } from '@/api/index'
import { ref, onMounted, watch } from 'vue'
import Search from './components/Search.vue'
let curErrorKind = ref() //当前错误类型
let small = ref(false)
let background = ref(false)
let disabled = ref(false)
let currentPage1 = ref(1)
let pageSize = ref(10)
let length1 = ref() //展示数据的长度
let data1 = ref() //挑选的时间段
let WebIdOption = ref() //该用户所有网站ID
let curWebId = ref() //当前网站ID
let curUrl = ref() //当前的路径
let errorData = ref()
let dateSelect = ref()
let curReqCondition = ref({
  url: '',
  time: '',
  type: 'SCRIPT_JS_WHITE_HTTP',
  message: '',
}) as any //当前选择的查询条件
let errorOption = ['全部', 'JS', '白屏', 'SRC', 'HTTP']
curWebId.value = 1 //初始化当前网站iD
curErrorKind.value = '全部' //默认错误类型
const getWebOption = () => {
  WebIdOption.value = ['1', '2', '3']
} //当前用户的网站列表从pinia拿
const handleCurrentChange = (val: number) => {
  currentPage1.value = val
  reqErrData(val)
} //改变页数
const switchStamp = (nS: any) => {
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
} //时间搓转换
const searchData = () => {
  currentPage1.value = 1
  reqErrData(1)
}
const reqErrData = (page: number) => {
  reqErr({
    web_id: curWebId.value,
    page: page,
    condition: curReqCondition._rawValue,
  }).then((res) => {
    console.log(res)
    errorData.value = res.data.logs
    length1.value = res.data.total
    errorData.value.map(function (element: any) {
      let index: number = element.type
      let arr: errLogShow = element
      arr.time = switchStamp(arr.time)
      arr.type = Type[index]
      return element
    })
  })
} //请求数据
reqErrData(1)
getWebOption()
onMounted(() => {})
watch(curWebId, () => {
  currentPage1.value = 1
  reqErrData(currentPage1.value)
})
//当前网站id监听  变化后更新数据
watch(dateSelect, (newVal) => {
  let startTime = new Date(newVal[0]).getTime()
  let endTime = new Date(newVal[1]).getTime()
  let time = startTime + '_' + endTime
  curReqCondition._rawValue.time = time
  currentPage1.value = 1
  reqErrData(currentPage1.value)
})
//监听日期  变化后更新数据
watch(curErrorKind, (newVal) => {
  switch (newVal) {
    case '全部':
      curReqCondition._rawValue.type = 'SRC_JS_White_HTTP'
      break
    case 'JS':
      curReqCondition._rawValue.type = 'JS'
      break
    case '白屏':
      curReqCondition._rawValue.type = 'White'
      break
    case 'HTTP':
      curReqCondition._rawValue.type = 'HTTP'
      break
    case 'SRC':
      curReqCondition._rawValue.type = 'SRC'
      break
  }
  currentPage1.value = 1
  reqErrData(currentPage1.value)
})
//监听异常类型 变化更新数据
watch(curUrl, (newVal) => {
  console.log(newVal)
  curReqCondition._rawValue.url = newVal
  currentPage1.value = 1
  reqErrData(currentPage1.value)
})
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <Search v-model:url="curReqCondition.url" @myclick="searchData" /><!-- 搜索框 -->
    <div class="block" style="margin: 10px 10px 10px; height: 30px; border: 1px black">
      <el-select
        v-model="curWebId"
        class="m-2"
        placeholder="Select"
        style="float: left; width: 150px"
      >
        <el-option v-for="item in WebIdOption" :key="item" :value="item" /> </el-select
      ><!-- 网站id选择 -->
      <el-select
        v-model="curSuccess"
        class="m-2"
        placeholder="Select"
        style="float: left; margin-left: 10px; width: 120px"
        ><!-- 状态选择 -->
        <el-option v-for="item in successOption" :key="item" :value="item" />
      </el-select>
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
    <div style="text-align: center" class="errorList">
      <el-table :data="httpData" style="width: 100%; text-align: left">
        <el-table-column fixed prop="log_id" label="日志编号" width="80" />
        <el-table-column prop="time" label="时间" width="150" />
        <el-table-column prop="url" label="页面路径" width="240" />
        <el-table-column prop="send_url" label="请求路径" width="240" />
        <el-table-column prop="res_time" label="响应时间(ms)" width="110" />
        <el-table-column prop="status" label="状态码" width="100" />
        <el-table-column prop="success" label="成功" width="100" />
        <el-table-column prop="way" label="方式" width="100" />
        <el-table-column prop="res_body" label="返回" />
      </el-table>
    </div>
    <!-- 数据显示 -->
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

    ><!-- 筛选列表 -->
  </div>
</template>

<script setup lang="ts">
import { reqHttp } from '@/api/index'
import { HTTPLogShow } from '@/interface/index'
import { ref, onMounted, watch } from 'vue'
import Search from './components/Search.vue'
let curSuccess = ref() //当前错误类型
let small = ref(false)
let background = ref(false)
let disabled = ref(false)
let currentPage1 = ref(1)
let pageSize = ref(10)
let length1 = ref() //展示数据的长度
let dateSelect = ref() //挑选的时间段
let WebIdOption = ref() as any //该用户所有网站ID
let curWebId = ref() //当前网站ID
let httpData = ref()
let curReqOption = ref() //当前选择的查询条件
let successOption = ['成功/失败', '成功', '失败']
let stateList = ['全部', '200', '300', '400', '500']
let showSet = ref(false)
let curReqCondition = ref({
  url: '',
  time: '',
  success: '',
  res_time: '',
  send_url: '',
}) as any //当前选择的查询条件
curWebId.value = 1 //初始化当前网站id
curSuccess.value = '成功/失败' //默认错误类型
const getWebOption = () => {
  WebIdOption.value = ['1', '2', '3']
} //当前用户的网站列表从pinia拿
const handleCurrentChange = (val: number) => {
  currentPage1.value = val
  reqHttpData(val)
} //改变页数
const switchStamp = (nS: any) => {
  return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ')
} //时间搓转换
const showSelectFrom = () => {
  showSet.value = true
} //显示性能指标筛选
const searchData = () => {
  currentPage1.value = 1
  reqHttpData(currentPage1.value)
}
const reqHttpData = (page: number) => {
  reqHttp({
    webId: curWebId.value,
    page: page,
    condition: curReqCondition,
  }).then((res) => {
    httpData.value = res.data.logs
    length1.value = res.data.total
    httpData.value.map(function (element: any) {
      let arr: HTTPLogShow = element
      arr.time = switchStamp(arr.time)
      return element
    })
  })
} //请求数据
reqHttpData(1)
getWebOption()
onMounted(() => {
  //console.log(newData);
})
watch(dateSelect, (newVal) => {
  let startTime = new Date(newVal[0]).getTime()
  let endTime = new Date(newVal[1]).getTime()
  let time = startTime + '_' + endTime
  curReqCondition._rawValue.time = time
  currentPage1.value = 1
  reqHttpData(currentPage1.value)
})
//监听日期  变化后更新数据为时间戳
watch(curWebId, () => {
  currentPage1.value = 1
  reqHttpData(currentPage1.value)
})
watch(curSuccess, (newVal) => {
  console.log(newVal)
  switch (newVal) {
    case '成功':
      curReqCondition._rawValue.success = true
      break
    case '成功/失败':
      curReqCondition._rawValue.success = ''
      break
    case '失败':
      curReqCondition._rawValue.success = false
      break
  }
  currentPage1.value = 1
  reqHttpData(currentPage1.value)
})
</script>

<style lang="scss" scoped></style>

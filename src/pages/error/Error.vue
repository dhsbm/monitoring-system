<template>
  <div class="container">
    <h1>异常日志</h1>
    <!-- 搜索框 -->
    <div class="filter">
      <el-select
        v-model="timeIndex"
        class="m-2"
        placeholder="Select"
        style="width: 120px; margin-right: 60px"
      >
        <el-option
          v-for="item in timeOption"
          :key="item.value"
          :label="item.key"
          :value="item.value"
        />
      </el-select>

      <el-input
        v-model="condition.url"
        style="width: 200px; margin-right: 60px"
        placeholder="路径查询"
        @change="searchData()"
      />

      <!-- 错误类型选择 -->
      <el-select
        v-model="condition.type"
        class="m-2"
        placeholder="Select"
        style="margin-right: 50px; width: 100px"
      >
        <el-option
          v-for="item in typeOption"
          :key="item.key"
          :label="item.key"
          :value="item.value"
        />
      </el-select>

      <el-input
        v-model="condition.message"
        style="width: 220px; margin-right: 20px"
        placeholder="异常信息查询"
        @change="searchData()"
      />
    </div>
    <div class="list">
      <el-table :data="showData.logs" size="large">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="url" label="路径" width="260" />
        <el-table-column prop="type" label="类型" width="150" />
        <el-table-column prop="message" label="报错信息" width="300" />
        <el-table-column prop="stack" label="堆栈" />
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="showData.page"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="showData.total"
        @current-change="searchData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Type } from '@/interface'
import { reqErr } from '@/api/index'
import { ref, watch, reactive, computed } from 'vue'
import { useWebStore } from '@/store'
import { ElMessage } from 'element-plus'
import { getBothTime, timeOption, formatTime } from '@/common'
const webStore = useWebStore()

const showData = reactive({
  logs: [] as any[],
  total: 0,
  page: 1,
  size: 10,
})

//当前选择的查询条件
const timeIndex = ref(2)
let condition = reactive({
  time: computed(() => {
    const [startTime, endTime] = getBothTime(timeIndex.value)
    return startTime + '_' + endTime
  }),
  url: '',
  type: '',
  message: '',
})

let typeOption = [
  { key: '全部', value: '' },
  { key: '脚本异常', value: '0' },
  { key: '资源异常', value: '1' },
  { key: '接口异常', value: '2' },
  { key: '白屏异常', value: '3' },
]

const searchData = (page = 1) => {
  reqErr({
    webId: webStore.webId,
    page,
    condition,
  }).then(({ code, data }) => {
    if (code == 0) {
      showData.logs = data.logs.map((val) => {
        return {
          ...val,
          type: getType(val.type),
          time: formatTime(val.time),
        }
      })
      showData.total = data.total
      showData.page = page
    } else {
      ElMessage({
        message: '网络异常',
        type: 'warning',
      })
    }
  })
}

const getType = (type: Type) => {
  switch (type) {
    case 0:
      return '脚本异常'
    case 1:
      return '资源异常'
    case 2:
      return '接口异常'
    case 3:
      return '白屏异常'
  }
}
searchData()
//请求数据
watch(
  () => webStore.webId,
  () => searchData()
)
watch(
  () => condition.type,
  () => searchData()
)
watch(
  () => condition.time,
  () => searchData()
)
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  h1 {
    font-size: 22px;
    padding: 10px 0;
    text-align: center;
    background: #eee;
  }
  .filter {
    height: 45px;
  }
  .list {
    flex: 1;
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
}
</style>

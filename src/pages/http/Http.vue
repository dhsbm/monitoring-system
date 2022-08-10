<template>
  <div class="container">
    <h1>网络请求日志</h1>
    <div class="filter">
      <el-select
        v-model="timeIndex"
        class="m-2"
        placeholder="Select"
        style="width: 120px; margin-right: 60px"
        @change="searchData()"
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
        placeholder="页面路径查询"
        @change="searchData()"
      />
      <el-input
        v-model="condition.sendUrl"
        style="width: 200px; margin-right: 80px"
        placeholder="请求路径查询"
        @change="searchData()"
      />
      <div class="time">
        <el-input
          v-model="startTime"
          type="number"
          style="width: 60px"
          placeholder="起始"
          @change="searchData()"
        />
        <span>-</span>
        <el-input
          v-model="endTime"
          type="number"
          style="width: 60px"
          placeholder="结束"
          @change="searchData()"
        />
        <span>毫秒</span>
      </div>

      <el-select
        v-model="condition.success"
        class="m-2"
        placeholder="Select"
        style="width: 80px"
        @change="searchData()"
      >
        <el-option
          v-for="item in successOption"
          :key="item.key"
          :value="item.value"
          :label="item.key"
        />
      </el-select>
    </div>
    <div class="list">
      <el-table :data="showData.logs" size="large" @cell-click="showBody">
        <el-table-column prop="time" label="请求时间" width="180" />
        <el-table-column prop="url" label="页面路径" width="260" :show-overflow-tooltip="true" />
        <el-table-column
          prop="sendUrl"
          label="请求路径"
          width="320"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="resTime" label="响应时间" width="100" />
        <el-table-column prop="status" label="状态码" width="90" />
        <el-table-column prop="success" label="成功" width="80" />
        <el-table-column prop="way" label="请求方法" width="90" />
        <el-table-column prop="resBody" label="返回信息" :show-overflow-tooltip="true" />
      </el-table>
    </div>
    <!-- 数据显示 -->
    <div class="pagination">
      <el-pagination
        v-model:currentPage="showData.page"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="showData.total"
        @current-change="searchData"
      />
    </div>

    ><!-- 筛选列表 -->
  </div>
</template>

<script setup lang="ts">
import { reqHttp } from '@/api/index'
import { ref, watch, reactive, computed } from 'vue'
import { getBothTime, timeOption, formatTime, formatMS } from '@/common'
import { useWebStore } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'
const webStore = useWebStore()
const showData = reactive({
  logs: [] as any[],
  total: 0,
  page: 1,
  size: 10,
})
const timeIndex = ref(2)
const startTime = ref('')
const endTime = ref('')
let condition = reactive({
  time: computed(() => {
    const [startTime, endTime] = getBothTime(timeIndex.value)
    return startTime + '_' + endTime
  }),
  url: '',
  resTime: computed(() => {
    const start = startTime.value
    const end = endTime.value
    if (start == '' && end == '') return ''
    else if (start == '') {
      return '0_' + parseInt(end)
    } else if (end == '') {
      return parseInt(start) + '_10000'
    } else {
      return parseInt(start) + '_' + parseInt(end)
    }
  }),
  sendUrl: '',
  success: '',
})
let resBodyMap: Map<number, string>
const searchData = (page = 1) => {
  reqHttp({
    webId: webStore.webId,
    page,
    condition,
  }).then(({ code, data }) => {
    if (code == 0) {
      const map = new Map()
      showData.logs = data.logs.map((val) => {
        map.set(val.logId, val.resBody)
        return {
          ...val,
          time: formatTime(val.time),
          resTime: formatMS(val.resTime),
          success: val.success === 0 ? '成功' : '失败',
        }
      })
      showData.total = data.total
      showData.page = page
      resBodyMap = map
    } else {
      ElMessage({
        message: '网络异常',
        type: 'warning',
      })
    }
  })
}
const showBody = (row: any, column: any) => {
  if (column.label == '返回信息') {
    ElMessageBox({
      message: resBodyMap.get(row.logId)!,
      title: '返回信息',
      confirmButtonText: '确认',
      customStyle: {
        width: '80%',
        maxWidth: '100%',
      },
    })
  }
}

searchData()
let successOption = [
  { key: '全部', value: '' },
  { key: '成功', value: '0' },
  { key: '失败', value: '1' },
]
watch(
  () => webStore.webId,
  () => {
    searchData()
  }
)
</script>

<style lang="scss" scoped>
.abc::v-deep {
  max-width: 100%;
  width: 80%;
}
.container {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  margin: 0 auto;
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
    .time {
      display: inline-block;
      margin-right: 50px;
      span {
        line-height: 45px;
      }
    }
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

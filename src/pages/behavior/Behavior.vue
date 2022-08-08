<template>
  <div class="container">
    <h1>用户行为日志</h1>
    <div class="filter">
      <div>
        <el-select
          v-model="timeIndex"
          class="m-2"
          placeholder="Select"
          style="width: 120px"
          @change="searchData()"
        >
          <el-option
            v-for="item in timeOption"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </div>

      <div>
        <el-input
          v-model="condition.url"
          style="width: 200px"
          placeholder="路径查询"
          @change="searchData()"
        />
      </div>

      <div class="duration">
        <el-input
          v-model="startDuration"
          style="width: 70px"
          placeholder="起始"
          @change="searchData()"
        />
        <span>-</span>
        <el-input
          v-model="endDuration"
          type="number"
          style="width: 70px"
          placeholder="结束"
          @change="searchData()"
        />
        <span>秒</span>
      </div>
      <div>
        <el-input
          v-model="condition.ip"
          type="number"
          style="width: 140px"
          placeholder="ip查询"
          @change="searchData()"
        />
      </div>

      <div></div>
    </div>
    <div class="list">
      <el-table :data="showData.logs" size="large">
        <el-table-column prop="time" label="时间" />
        <el-table-column prop="url" label="路径" />
        <el-table-column prop="duration" label="停留时间(ms)" />
        <el-table-column prop="ip" label="ip" />
        <el-table-column prop="area" label="地区" />
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
import { Area } from '@/interface/index'
import { reqBeh } from '@/api/index'
import { ref, watch, reactive, computed } from 'vue'
import { useWebStore } from '@/store'
import { ElMessage } from 'element-plus'
import { getBothTime, timeOption, formatTime, formatMS } from '@/common'

const webStore = useWebStore()
const showData = reactive({
  logs: [] as any[],
  total: 0,
  page: 1,
  size: 10,
})
//当前选择的查询条件
const timeIndex = ref(2)
const startDuration = ref('')
const endDuration = ref('')
let condition = reactive({
  time: computed(() => {
    const [startTime, endTime] = getBothTime(timeIndex.value)
    return startTime + '_' + endTime
  }),
  url: '',
  duration: computed(() => {
    const start = startDuration.value
    const end = endDuration.value
    if (start == '' && end == '') return ''
    else if (start == '') {
      return '0_' + parseInt(end) * 1000
    } else if (end == '') {
      return parseInt(start) * 1000 + '_86400000'
    } else {
      return parseInt(start) * 1000 + '_' + parseInt(end) * 1000
    }
  }),
  ip: '',
})
const searchData = (page = 1) => {
  reqBeh({
    webId: webStore.webId,
    page,
    condition,
  }).then(({ code, data }) => {
    if (code == 0) {
      showData.logs = data.logs.map((val) => {
        return {
          ...val,
          time: formatTime(val.time),
          area: Area[val.area],
          duration: formatMS(val.duration),
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
searchData()
watch(
  () => webStore.webId,
  () => {
    searchData()
  }
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
    display: flex;
    & > div {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .duration {
      display: inline-block;
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

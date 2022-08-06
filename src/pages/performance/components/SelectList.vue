<template>
  <div id="container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="参数" width="110">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.option }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="最小值" width="250">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-input-number v-model="scope.row.min" :step="1" style="width: 150px" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="最大值" width="250">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-input-number v-model="scope.row.max" :step="1" style="width: 150px" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="primary"
      @click="emit('myclick')"
      style="background-image: none; height: 30px; width: 50px; float: right"
      >筛选</el-button
    >
    <span> &nbsp</span>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, defineProps, defineEmits } from 'vue'

let selectCondition = ref({
    url:'',
  time:'',
  dns:'',
  fp:'',
  fcp:'',
  lcp:'',
  dcl:'',
  l:''
}) as any
const props = defineProps<{
  condition
}>()

const emit = defineEmits(['update:condition', 'myclick'])

const tableData = ref([
  {
    option: 'DNS(ms)',
    min: '',
    max: '',
  },
  {
    option: 'FP(ms)',
    min: '',
    max: '',
  },
  {
    option: 'FCP(ms)',
    min: '',
    max: '',
  },
  {
    option: 'LCP(ms)',
    min: '',
    max: '',
  },
  {
    option: 'DCL(ms)',
    min: '',
    max: '',
  },
  {
    option: 'L(ms)',
    min: '',
    max: '',
  },
])
const updata = (item) => {
    
    
  selectCondition._rawValue.dns = item[0].min + '_' + item[0].max
  selectCondition._rawValue.fp = item[1].min + '_' + item[1].max
  selectCondition._rawValue.fcp = item[2].min + '_' + item[2].max
  selectCondition._rawValue.lcp = item[3].min + '_' + item[3].max
  selectCondition._rawValue.dcl = item[4].min + '_' + item[4].max
  selectCondition._rawValue.l = item[5].min + '_' + item[5].max
  console.log( selectCondition);
}
watch(
  () => tableData,
  (newValue: any) => {
    //console.log(newValue);
    
    updata(newValue._rawValue)
    emit('update:condition', selectCondition)
  },
  { deep: true, immediate: true }
)
</script>
<style scoped>
</style>
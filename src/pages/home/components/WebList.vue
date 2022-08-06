<script setup lang='ts'>
import { WebInfo } from '@/interface';
import { onMounted } from 'vue';
import  WebItem  from './WebItem.vue'
import { reqWebList } from '@/api';

let webList = $ref<WebInfo[]>()

onMounted(async() => {
  console.log('onMounted')
  const { data } = await reqWebList()
  webList = data?.webList
})

let total = $ref(400)
const currentPage = $ref(1)
const pageSize = $ref(100)
const small = $ref(false)
const background = $ref(false)
const disabled = $ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

</script>

<template>
  <div>
    <div
      class="grid grid-cols-1 gap-7 md:grid-cols-3 sm:grid-cols-2 "
    >
      <WebItem
        v-for="(web, index) in webList"
        :key="index"
        :web-info="web"
      />
    </div>
    <div class="fixed right-10 bottom-10">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style>

</style>

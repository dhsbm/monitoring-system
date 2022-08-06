<script setup lang="ts">
import { WebInfo } from '@/interface'
import { onMounted } from 'vue'
import WebItem from './WebItem.vue'
import { reqWebList } from '@/api'

let webList = $ref<WebInfo[]>()

onMounted(async () => {
  const { data } = await reqWebList()
  webList = data.webList
})
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-7 md:grid-cols-3 sm:grid-cols-2">
      <WebItem v-for="(web, index) in webList" :key="index" :web-info="web" />
    </div>
  </div>
</template>

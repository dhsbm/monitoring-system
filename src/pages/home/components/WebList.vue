<script setup lang="ts">
import { onMounted } from 'vue'
import WebItem from './WebItem.vue'
import { useWebStore } from '@/store'

const webStore = useWebStore()

onMounted(async () => {
  webStore.getWebs()
})
</script>

<template>
  <div>
    <div class="grid grid-cols-1 gap-7 md:grid-cols-3 sm:grid-cols-2">
      <WebItem v-for="(web, index) in webStore.webList" :key="index" :web-info="web" />
    </div>
  </div>
</template>

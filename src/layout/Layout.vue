<template>
  <div class="common-layout">
    <el-container>
      <el-header><Headers></Headers></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Headers from './headers/Headers.vue'
</script>

<style lang="scss" scoped>
.el-header,
.el-main {
  padding: 0;
}
</style>

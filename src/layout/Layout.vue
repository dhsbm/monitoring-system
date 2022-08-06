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
.el-header {
  padding: 0;
  height: 50px;
  box-shadow: 0px 7px 7px -10px #5e5e5e;
}
.el-main {
  height: calc(100vh - 50px);
  padding: 0;
}
</style>

<template>
  <div class="headers">
    <div class="title">网站监控系统</div>
    <div class="fill"></div>
    <div><router-link to="home">首页</router-link></div>
    <div><router-link to="overview">概览</router-link></div>
    <div><router-link to="error">异常</router-link></div>
    <div><router-link to="performance">性能</router-link></div>
    <div><router-link to="behavior">行为</router-link></div>
    <div><router-link to="http">请求</router-link></div>
    <div>user</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.headers {
  display: flex;
  background-color: rgb(255, 255, 255);
  div {
    height: 50px;
    padding: 0 20px;
    line-height: 50px;
    a {
      text-decoration: none;
      color: #000;
    }
    &:hover {
      background-color: #ddd;
    }
  }
  .title {
    font-size: 24px;
    font-weight: 800;
    &:hover {
      background-color: transparent;
    }
  }
  .fill {
    flex: 1;
    &:hover {
      background-color: transparent;
    }
  }
}
</style>

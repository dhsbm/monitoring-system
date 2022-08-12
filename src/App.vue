<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style lang="scss">
html,
body {
  height: 100%;
  background-color: rgb(243 244 246);
}
// 清除数字输入框的上下箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>

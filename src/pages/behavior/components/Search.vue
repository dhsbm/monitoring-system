<template>
  <div id="container">
    <div class="search bar1">
      <h1 style="font-size: 20px; margin-bottom: 20px">行为信息</h1>
      <form>
        <input type="text" v-model="v" placeholder="请输入您要搜索的路径..." />
        <button type="submit" @click="emit('myclick')"></button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, defineProps, defineEmits } from 'vue'
const props = defineProps<{ url: any }>()
const v = ref(props.url)
watch(
  () => props.url,
  (value) => {
    emit('update:url', value)
  }
)
const emit = defineEmits(['update:url', 'myclick'])
</script>

<style lang="scss" scoped>
.demo-pagination-block {
  display: flex;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: #d3d4db;
  font-weight: 500;
}

#container {
  text-align: center;

  margin: 0 auto;
}
div.search {
  padding: 30px 0;
}

form {
  position: relative;
  width: 300px;
  margin: 0 auto;
}

input,
button {
  border: none;
  outline: none;
  background-image: url('@/assets/search.svg');
}

input {
  width: 100%;
  height: 42px;
  padding-left: 13px;
}

button {
  height: 42px;
  width: 42px;
  cursor: pointer;
  position: absolute;
}
.errorList {
}
/*搜索框1*/
.bar1 {
  background: #d8d8d8;
}
.bar1 input {
  border: 2px solid #7ba7ab;
  border-radius: 5px;
  background: white;
  color: #9e9c9c;
}
.bar1 button {
  top: 0;
  right: 0;
  background: #7ba7ab;
  border-radius: 0 5px 5px 0;
}
.bar1 button:before {
  content: '\f002';
  font-family: FontAwesome;
  font-size: 16px;
  color: #f9f0da;
}
</style>

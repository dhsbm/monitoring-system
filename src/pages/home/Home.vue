<template>
  <div class="bg-gray-100 min-h-screen p-5 ">
    <button
      class="bg-slate-300 text-slate-700 hover:bg-slate-400 btn"
      @click="modalAddWeb.show()"
    >
      <Add />添加网站
    </button>
    <WebList class="mt-5" />
    <ModalAddWeb ref="modalAddWeb" />
  </div>
</template>

<script setup lang="ts">
import WebList from './components/WebList.vue';
import ModalAddWeb from './components/ModalAddWeb.vue';

const modalAddWeb = $ref<InstanceType<typeof ModalAddWeb>>()

</script>


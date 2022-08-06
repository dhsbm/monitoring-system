<script setup lang='ts'>
defineProps<{
  modelValue: boolean,
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

</script>

<template>
  <div
    :class="['fixed w-screen h-screen z-50 top-0 left-0 grid', modelValue ? 'visible' : 'invisible']"
  >
    <div
      :class="['z-0 absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-60 transition-all ease-in-out duration-500', modelValue ? 'opacity-100' : 'opacity-0']"
      @click="$emit('update:modelValue', false)"
    ></div>
    <div :class="['z-10 m-auto transition-all ease-in-out duration-500 center', modelValue && 'active']">
      <slot>出错了</slot>
    </div>
  </div>
</template>

<style lang="css" scoped>

.center {
  transform: scale(0.5);
  opacity: 0;
}

.center.active {
  transform: scale(1);
  opacity: 1;
}
</style>

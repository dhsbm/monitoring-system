<template>
  <el-progress
    type="circle"
    :percentage="val"
    :color="color"
    :width="width"
    :stroke-width="strokewidth"
  >
    <template v-if="type == 1">
      <span class="percentage-value">
        <i id="val">{{ val }}</i>
        <i id="percent">%</i>
      </span>
    </template>

    <template v-else>
      <span class="percentage-value-2" :style="`color: ${color}`">
        <span id="val">{{ val }}</span>
        <br />
        <span id="text">{{ text }}</span>
      </span>
    </template>
    <div class="bottom_text" v-if="type == 1">{{ text }}</div>
  </el-progress>
  <!-- <div v-if="type == 2" class="tip">良好</div> -->
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  val: Number,
  width: Number,
  strokewidth: Number,
  type: Number,
  text: String,
  color: String,
})
</script>

<style scoped lang="scss">
.percentage-value {
  #val {
    font-size: 3rem;
  }
  #percent {
    margin: 22px 0 0 3px;
    font-size: 1rem;
  }
}
.percentage-value-2 {
  #val {
    font-size: 4rem;
  }
  #text {
    text-align: center;
    margin-top: 0.1rem;
    font-size: 1rem;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #363b52;
    line-height: 0.22rem;
  }
}
.bottom_text {
  margin-top: 3px;
  font-size: 0.7rem;
}
</style>

<template>
  <div v-if="props.isNotMain" class="header-layout">
    <div @click="$router.go(-1)">
      <img src="@/assets/icon/icon-back.png" alt="img">
    </div>
    <div @click="$router.push('/')">
      <img src="@/assets/icon/icon-home.png" alt="img">
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  isNotMain: Boolean
})
</script>

<style scoped lang="scss">
.header-layout {
  display: flex;
  justify-content: space-between;
  div {
    width: 25px;
    cursor: pointer;
    img {
      width: 100% ;
      display: block;
    }
  }
}
</style>
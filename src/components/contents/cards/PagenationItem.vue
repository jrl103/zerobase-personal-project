<template>
  <div class="pagenation-item">
    <div class="title">{{props.title}}</div>
    <div class="contents">{{props.contents}}</div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  title: String,
  contents: String
})
</script>

<style scoped lang="scss">
.pagenation-item {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  font-size: 17px;
  border: 1px solid #2c3e50;
}
</style>
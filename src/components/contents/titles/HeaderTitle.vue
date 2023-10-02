<template>
  <div class="header-title">
    <p>{{props.title}}</p>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

const props = defineProps({title: String})
</script>

<style scoped lang="scss">
.header-title {
  p {
    font-size: 42px;
    font-weight: bold;
  }
}
</style>
<template>
  <div class="form-button">
    <button type="button" @click="emits('clickButton')">{{props.title}}</button>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'

const props = defineProps({
  title: String
})

const emits = defineEmits(['clickButton'])
</script>

<style scoped lang="scss">
.form-button {
  button {
    width: 150px;
    height: 40px;
    background-color: antiquewhite;
    border: 1px solid antiquewhite;
    border-radius: 7px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
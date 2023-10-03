<template>
  <div class="input-box">
    <label :for="props.value.id">{{ props.label }}</label>
    <input :type="props.value.type" :id="props.value.id"
           :placeholder="props.value.placeholder" :value="props.modelValue"
           @input="updateValue">
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  value: Object
})

const emits = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emits('update:modelValue', event.target.value)
}
</script>

<style scoped lang="scss">
.input-box {
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    width: 100px;
    display: block;
    //margin-right: 10px;
  }

  input {
    width: 200px;
    height: 30px;
    padding: 3px 0 0 8px;
    border-radius: 5px;
  }
}
</style>
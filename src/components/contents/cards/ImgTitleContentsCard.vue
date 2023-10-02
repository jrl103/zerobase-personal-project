<template>
  <div class="img-title-contents-card" @click="emits('onClickEvt')">
    <div class="img-box">
      <img :src="props.imgUrl" alt="img">
    </div>
    <p>{{props.title}}</p>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'

const props = defineProps({
  title: String,
  imgUrl: String
})

const emits = defineEmits(['onClickEvt'])

</script>

<style scoped lang="scss">
.img-title-contents-card {
  border: 1.5px solid #2c3e50;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    border: 1.5px solid tomato;
  }
  p {
    font-size: 20px;
    font-weight: bold;
  }
  .img-box {
    width: 25px;
    padding-bottom: 10px;
    margin: 0 auto;
    img {
      display: block;
      width: 100%;
    }
  }
}

</style>
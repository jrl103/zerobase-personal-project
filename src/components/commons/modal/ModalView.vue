<template>
  <div class="modal-view">
    <div class="modal-contents">
      <div class="modal-top">
        <button @click="emits('clickClose')">X</button>
      </div>
      <div class="modal-body">
        <div class="input-box-wrap">
          <InputBox v-model="foodTitle" :label="'음식 이름'" :value="{
                type: 'text',
                id: 'foodTitle',
                placeholder: '음식 이름을 입력해주세요.'
              }"/>
        </div>
        <div class="input-box-wrap">
          <InputBox v-model="foodContent" :label="'음식 설명'" :value="{
                type: 'text',
                id: 'foodContent',
                placeholder: '음식 설명을 입력해주세요.'
              }"/>
        </div>
      </div>
      <div class="button-wrap">
        <FormButton :title="'등록하기'" @click-button="registerItem()" />
      </div>
    </div>
    <div class="dim"></div>
  </div>
</template>

<script setup>
import {defineEmits, ref} from 'vue'
import {addDoc, collection, getFirestore} from "firebase/firestore/lite";
import firebase from "@/firebaseConfig";

import InputBox from "@/components/contents/formItems/input/InputBox.vue";
import FormButton from "@/components/contents/buttons/FormButton.vue";

const emits = defineEmits(['clickClose'])

const foodTitle = ref('')
const foodContent = ref('')

const registerItem = async () => {
  const foodTest = collection(getFirestore(firebase), 'food')

  try {
    await addDoc(foodTest, {
      title: foodTitle.value,
      content: foodContent.value,
    })
    alert('등록에 성공했습니다.')
    emits('clickClose')
  } catch (e) {
    console.log(e)
  }
}


</script>

<style scoped lang="scss">
.modal-view {
  width: 600px;
  height: 100vh;
  position: fixed;
  top: 0;

  .modal-contents {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    z-index: 1;

    .modal-top {
      display: flex;
      justify-content: flex-end;

      button {
        margin: 15px 15px 0 0px;
      }
    }
  }

  .dim {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
  }
}
.input-box-wrap {
  margin-bottom: 20px;
}
</style>
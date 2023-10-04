<template>
  <div class="wrapper">
    <FormLayout>
      <template v-slot:contents>
        <section class="section">
          <form action="submit">
            <div class="input-box-wrap">
              <InputBox v-model="idInput" :label="'아이디'" :value="{
                type: 'text',
                id: 'id',
                placeholder: '아이디를 입력해주세요.'
              }"/>
            </div>
            <div class="input-box-wrap">
              <InputBox v-model="pwdInput" :label="'비밀번호'" :value="{
                type: 'password',
                id: 'password',
                placeholder: '비밀번호를 입력해주세요.'
              }"/>
            </div>
            <div class="input-box-wrap">
              <InputBox v-model="pwdCheckInput" :label="'비밀번호 확인'" :value="{
                type: 'password',
                id: 'passwordCheck',
                placeholder: '비밀번호를 재입력해주세요.'
              }"/>
            </div>

            <div class="button-wrap">
              <FormButton :title="'회원가입'" @click-button="signUp()"/>

            </div>
          </form>
        </section>
      </template>
    </FormLayout>

  </div>
</template>

<script setup>
import {ref} from "vue";
import firebase from '@/firebaseConfig'
import { collection, getFirestore, addDoc } from 'firebase/firestore/lite'
import {useRouter} from "vue-router";

import FormLayout from "@/components/layouts/form/FormLayout.vue";
import InputBox from "@/components/contents/formItems/input/InputBox.vue";
import FormButton from "@/components/contents/buttons/FormButton.vue";

const router = useRouter()

const idInput = ref('')
const pwdInput = ref('')
const pwdCheckInput = ref('')

const checkdPwd = () => {
  if (pwdInput.value === pwdCheckInput.value) {
    return true
  } else {
    return false
  }
}

const signUp = async () => {
  const test = collection(getFirestore(firebase), 'board')

  try {
    if (checkdPwd()) {
      await addDoc(test, {
        id: idInput.value,
        pwd: pwdInput.value,
        chkPwd: pwdCheckInput.value,
      })
      alert('회원가입에 성공했습니다.')
      router.push('/login')
    } else {
      alert('비밀번호가 동일하지 않습니다.')
    }

  } catch (e) {
    console.log(e)
  }
}

</script>

<style scoped lang="scss">
.input-box-wrap {
  margin-bottom: 20px;
}
.button-wrap {
  margin-top: 50px;
}
</style>
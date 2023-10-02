<template>
  <div class="wrapper">
    <h1>Sign up</h1>
    <section class="section">
      <form action="submit">
        <div class="id">
          <label for="id">id</label>
          <input type="text" id="id" v-model="idInput">
        </div>
        <div class="password">
          <label for="password">password</label>
          <input type="password" id="password" v-model="pwdInput">
        </div>
        <div class="passwordCheck">
          <label for="passwordCheck">passwordCheck</label>
          <input type="password" id="passwordCheck" v-model="pwdCheckInput" @input="checkdPwd">
        </div>
        <button @click="signUp()" type="button">회원가입</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import {ref} from "vue";
import firebase from '@/firebaseConfig'
import { collection, getFirestore, addDoc } from 'firebase/firestore/lite'
import {useRouter} from "vue-router";

const router = useRouter()

const idInput = ref('')
const pwdInput = ref('')
const pwdCheckInput = ref('')

const checkdPwd = () => {
  if (pwdInput.value === pwdCheckInput.value) {
    console.log('비밀번호가 동일합니다.')
    return true
  } else {
    console.log('비밀번호가 동일하지 않습니다.')
    return false
  }
}

const signUp = async () => {
  const test = collection(getFirestore(firebase), 'board')

  try {
    if (checkdPwd) {
      await addDoc(test, {
        id: idInput.value,
        pwd: pwdInput.value,
        chkPwd: pwdCheckInput.value,
      })
      alert('회원가입에 성공했습니다.')
      await router.push('/sociallogin')
    } else {
      alert('비밀번호가 동일하지 않습니다.')
    }

  } catch (e) {
    console.log(e)
  }
}

</script>

<style scoped lang="scss">
.wrapper {
  width: 1200px;
  margin: 0 auto;
}

.section {
  margin: 0 auto;
}

.wrapper .section div {
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
}

label {
  margin-right: 10px;
}
</style>
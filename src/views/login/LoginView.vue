<template>
  <div class="wrapper">
    <div class="section">
      <div class="login">
        <form action="">
          <div>
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="idInput">
          </div>
          <div>
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="pwdInput">
          </div>
          <button type="button" @click="login()">로그인</button>
        </form>
      </div>
      <SocialLoginView/>
    </div>

  </div>
</template>

<script setup>
import SocialLoginView from "@/views/login/SocialLoginView.vue";
import firebase from "@/firebaseConfig";
import { collection, getFirestore, getDocs } from 'firebase/firestore/lite'
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const route = useRouter()
const acessTokenKey = ref('')
const accessTokenValue = ref('')

const idInput = ref('')
const pwdInput = ref('')
const msg = ref('')

const login = async () => {
  const test = collection(getFirestore(firebase), 'board')

  const testData = await getDocs(test)

  let result = []
  testData.forEach((item) => {
    const fileds = item._document.data.value.mapValue.fields
    result.push({
      id: fileds.id.stringValue,
      pwd: fileds.pwd.stringValue,
    })
  })
  result.forEach(item => {
    if (item.id === idInput.value) {
      // 아이디가 있는 경우
      if (item.pwd === pwdInput.value) {
        // 아이디, 비밀번호가 맞는 경우
        // const expire = new Date()
        msg.value = '로그인 되었습니다.'
        document.cookie = "accessToken=sampleToken1"
        route.push('/')
      } else {
        // 비밀번호가 틀린 경우
        msg.value = '비밀번호가 틀렸습니다.'
      }
    } else {
      // 아이디가 없는 경우
      msg.value = '계정 정보가 없습니다.'
    }
  })
  alert(msg.value)
}

onMounted(() => {
  const test2 = new Array(document.cookie)
  console.log(test2)

  test2.forEach((item) => {
    const divide1 = item.split(';')
    console.log(divide1)

    divide1.forEach((item2) => {
      const divide2 = item2.split('=')
      console.log(divide2)

      if (divide2[0] === 'accessToken') {
        acessTokenKey.value = divide2[0]
        accessTokenValue.value = divide2[1]
      }
    })
  })
  console.log('acessTokenKey.value', acessTokenKey.value)
  console.log('accessTokenValue.value', accessTokenValue.value)

  if (accessTokenValue.value) {
    alert('이미 로그인 되었습니다.')
    route.push('/')
  }
})
</script>

<style scoped lang="scss">
</style>
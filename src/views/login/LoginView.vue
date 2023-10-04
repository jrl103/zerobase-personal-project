<template>
  <div class="wrapper">
    <div class="section">
      <FormLayout>
        <template v-slot:contents>
          <div class="login">
            <form>
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

              <div class="button-wrap">
                <FormButton :title="'로그인'" @click-button="login()"/>
              </div>
            </form>
          </div>
        </template>
      </FormLayout>
      <SocialLoginView/>
    </div>

  </div>
</template>

<script setup>
import SocialLoginView from "@/views/login/SocialLoginView.vue";
import FormLayout from "@/components/layouts/form/FormLayout.vue";
import InputBox from "@/components/contents/formItems/input/InputBox.vue";
import FormButton from "@/components/contents/buttons/FormButton.vue";

import firebase from "@/firebaseConfig";
import {collection, getFirestore, getDocs} from 'firebase/firestore/lite'
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
  const idCheckVal = result.some(item => item.id === idInput.value)
  const pwdCheckVal = result.some(item => item.pwd === pwdInput.value)

  if (idCheckVal) {
    if (pwdCheckVal) {
      // 아이디, 비밀번호가 맞는 경우
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

  alert(msg.value)
}

onMounted(() => {
  const test2 = new Array(document.cookie)

  test2.forEach((item) => {
    const divide1 = item.split(';')

    divide1.forEach((item2) => {
      const divide2 = item2.split('=')

      if (divide2[0] === 'accessToken') {
        acessTokenKey.value = divide2[0]
        accessTokenValue.value = divide2[1]
      }
    })
  })

  if (accessTokenValue.value) {
    alert('이미 로그인 되었습니다.')
    route.push('/')
  }
})
</script>

<style scoped lang="scss">
.input-box-wrap {
  margin-bottom: 20px;
}
.button-wrap {
  margin-top: 50px;
}
</style>
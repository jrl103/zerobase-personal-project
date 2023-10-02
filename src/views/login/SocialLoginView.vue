<template>
  <div class="wrapper">
    <section class="section">
      <div class="socialLogin">
        <div class="naver">네이버</div>
        <div class="kakao" @click="kakaoLogin()">카카오</div>
        <div class="facebook">페이스북</div>
        <div class="google">구글</div>
      </div>
      <div class="footer">
        <p class="join" @click="$router.push('/signup')">회원가입</p>
        <p class="findPwd">비밀번호 찾기</p>
      </div>
    </section>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";

const router = useRouter()
const kakaoLogin = () => {
  // const params = {
  //   redirectUri:'http://localhost:8080/',
  // }
  // window.Kakao.Auth.authorize(params)

  // 로그인 시도
  window.Kakao.Auth.login({
    success: (res) => {
      console.log(res)

      // 프로필 정보 가져오기
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (res) => {
          console.log(res);
        },
        fail: (error) => {
          console.error(error);
        }
      });

      // 로그인 완료 페이지로 이동
      router.push('/completelogin')
    } ,
    fail: (err) => {
      console.log(err)
    }
  })
}

</script>

<style scoped lang="scss">
.wrapper {
  width: 1200px;
  margin: 0 auto;
}
h1 {
  margin-bottom: 15px;
}
.section {
  margin: 0 auto;
}
label {
  margin-right: 10px;
}
.wrapper .section div {
  margin-bottom: 20px;
}
.socialLogin {
  display: flex;
  gap: 15px;
}
.footer {
  display: flex;
  gap: 15px;
}

</style>
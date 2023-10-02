<template>
  <div class="wrapper">
    <section class="section">
      <div class="socialLogin">
<!--        <div class="naver">네이버</div>-->
        <div class="kakao" @click="kakaoLogin()">카카오 소셜로그인</div>
<!--        <div class="facebook">페이스북</div>-->
<!--        <div class="google">구글</div>-->
      </div>
      <div class="footer">
        <p class="join" @click="$router.push('/signup')">회원가입</p>
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

</style>
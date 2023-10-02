<template>
  <div>
    <h1>Project</h1>
    <ul>
      <li>
        <button @click="$router.push('/signup')">회원가입</button>
      </li>
      <li v-if="!accessTokenValue">
        <button @click="$router.push('/login')">로그인</button>
      </li>
      <li v-else>
        <button @click="logOut()">로그아웃</button>
      </li>
      <li>
        <button @click="$router.push('/sociallogin')">소셜 로그인</button>
      </li>
      <li>
        <button @click="$router.push('/pagenation')">페이지네이션</button>
      </li>
      <li>
        <button @click="$router.push('/search')">검색</button>
      </li>
      <li>
        <button @click="$router.push('/wishList')">위시리스트</button>
      </li>
      <li>
        <button @click="$router.push('/filtering')">상품 필터링</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const acessTokenKey = ref('')
const accessTokenValue = ref('')
const logOut = () => {
  document.cookie = 'accessToken' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  alert('로그아웃 되었습니다.')
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
})
</script>
<style></style>
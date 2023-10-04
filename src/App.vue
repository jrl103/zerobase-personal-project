<template>
  <div class="main-container">
    <HeaderLayout :is-not-main="isNotMain"/>
    <div class="header-title-wrap">
      <HeaderTitle :title="headerTitle"/>
    </div>
    <router-view/>
  </div>
</template>

<script setup>
import HeaderTitle from "@/components/contents/titles/HeaderTitle.vue";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import HeaderLayout from "@/components/layouts/HeaderLayout.vue";

const headerTitle = ref('Project')
const isNotMain = ref(false)
const route = useRoute()

watch(() => route.path, (to) => {
  switch (to) {
    case '/' :
      headerTitle.value = 'Project'
      isNotMain.value = false
      break
    case '/signup' :
      headerTitle.value = 'Signup'
      isNotMain.value = true
      break
    case '/login' :
      headerTitle.value = 'Login'
      isNotMain.value = true
      break
    case '/pagenation' :
      headerTitle.value = 'Pagenation'
      isNotMain.value = true
      break
    case '/search' :
      headerTitle.value = 'Search'
      isNotMain.value = true
      break
    case '/wishList' :
      headerTitle.value = 'Wish List'
      isNotMain.value = true
      break
    case '/filtering' :
      headerTitle.value = 'Product Filterings'
      isNotMain.value = true
      break
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.main-container {
  width: 600px;
  margin: 0 auto;
}
.header-title-wrap {
  margin-bottom: 30px;
}
</style>

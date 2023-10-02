<template>
  <div class="main-container">
    <HeaderTitle :title="headerTitle"/>
    <router-view/>
  </div>
</template>

<script setup>
import HeaderTitle from "@/components/contents/titles/HeaderTitle.vue";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";

const headerTitle = ref('')
const router = useRouter()

watch(() => router.path, (to, from) => {
  console.log('to', to)
  console.log('from', from)
})
onMounted(() => {
  console.log('router', router)
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
</style>

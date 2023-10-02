<template>
  <div>
    <h1>Pagenation</h1>
    <div class="pageNation">
      <div v-for="(pageNum, idx) in processList" :key="idx"
           :class="currentPage === pageNum.pageNum ? 'is-active' : ''"
           @click="clickPage(pageNum.pageNum)"
      >
        <p>{{ idx + 1 }}</p>
      </div>
    </div>
    <div class="dataList">
      <div v-for="(data, idx) in currentDataList" :key="idx">
        <div>{{data.title}}</div>
        <div>{{data.contents}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

let pagenationDatas = ref(null)
let processList = ref([])
const currentPage = ref(1)
const currentDataList = ref([])


// 가데이터 만들기
const createdPageData = () => {
  const result = new Array(150).fill(null).map((_, index) => {
    return {
      title: `title${index}`,
      contents: `contents${index}`
    }
  })
  pagenationDatas.value = result
}

const divideData = () => {
  const repeatNum = pagenationDatas.value.length / 10
  for (let i = 1; i <= repeatNum; i++) {
    processList.value.push({
      pageNum: i,
      list: pagenationDatas.value.splice(0, 10)
    })
  }
}

const clickPage = (pageNum) => {
  currentPage.value = pageNum

  processList.value.forEach((item) => {
    if (pageNum === item.pageNum) {
      currentDataList.value = item.list
    }
  })
}

onMounted(() => {
  createdPageData()
  divideData()
  clickPage(1)
})
</script>

<style scoped lang="scss">
.pageNation {
  display: flex;

  p {
    padding: 15px;
    cursor: pointer;
  }
}

.is-active {
  color: red;
}
</style>
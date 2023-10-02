<template>
  <div>
    <h1>Search</h1>
    <form>
      <div class="search-box">
        <label for="search">검색</label>
        <div class="input-box">
          <input id="search" type="text" :value="inputValue"
                 @input="handleInput">
          <div :class="inputValue ? 'input-bottom' : 'input-bottom is-hidden'">
            <div v-for="(item, index) in autoCompleteList" :key="'auto' + index"
                 @click="clickInputData(item)">
              <p>{{ item }}</p>
            </div>
          </div>
        </div>
        <button type="button" @click="clickSearchBtn()">Search</button>
      </div>
    </form>
    <div class="dataList" v-for="(item, idx) in searchedDataList" :key="idx">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const inputValue = ref('')
const newData = ref([])
const searchedDataList = ref([])
const autoCompleteList = ref([])

// 가상 데이터 가공
const dataProcess = () => {
  // 가상 데이터 배열 생성
  const data = [
    "떡볶이",
    "연어초밥",
    "곱창",
    "곱도리탕",
    "오므라이스",
    "계란초밥",
    "텐동",
    "돈까스",
    "치킨",
    "피자",
    "삶은계란",
    "계란프라이",
    "김치볶음밥",
    "에그타르트",
    "탕후루",
  ];

  data.forEach((item) => {
    for (let i = 1; i <= 3; i++) {
      newData.value.push(item + i)
    }
  })
}

const clickSearchBtn = () => {
  searchedDataList.value = newData.value.filter((element1) => element1.includes(inputValue.value))
}

const handleInput = (event) => {
  // 한글을 실시간으로 반영하기 위해서는 v-model이 아니라 event를 이용해서 넣어줘야한다.
  inputValue.value = event.target.value
  autoCompleteList.value = newData.value.filter((item) => item.includes(inputValue.value));
};

const clickInputData = (item) => {
  inputValue.value = item
  clickSearchBtn()
}

onMounted(() => {
  dataProcess()
})

</script>
<style scoped lang="scss">
.search-box {
  display: flex;
}

.input-bottom {
  background-color: beige;
  cursor: pointer;
  &.is-hidden {
    display: none;
  }
}
</style>
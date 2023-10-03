<template>
  <div class="search-view">
    <form>
      <div class="search-box">
        <p>ex ) 피자, 떡볶이, 계란 ...</p>
        <div class="input-box">
          <InputBox v-model="inputValue" @input="handleInput" :label="'검색'" :value="{
                type: 'text',
                id: 'search',
                placeholder: '검색해주세요.'
              }"/>
          <div :class="inputValue ? 'input-bottom' : 'input-bottom is-hidden'">
            <div v-for="(item, index) in autoCompleteList" :key="'auto' + index"
                 @click="clickInputData(item)">
              <p>{{ item }}</p>
            </div>
          </div>
        </div>

        <div class="button-wrap">
          <FormButton :title="'Search'" @click-button="clickSearchBtn()"/>
        </div>
      </div>
    </form>
    <div class="dataList" v-for="(item, idx) in searchedDataList" :key="idx">
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import InputBox from "@/components/contents/formItems/input/InputBox.vue";
import FormButton from "@/components/contents/buttons/FormButton.vue";

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
  if (inputValue.value) {
    searchedDataList.value = newData.value.filter((element1) => element1.includes(inputValue.value))
  } else {
    alert('검색창이 비었습니다.')
    searchedDataList.value = []
  }
}

const handleInput = (event) => {
  // 한글을 실시간으로 반영하기 위해서는 v-model이 아니라 event를 이용해서 넣어줘야한다.
  // :value="inputValue" @input="handleInput" 에서
  // --> 컴포넌트화 시키면서  v-model="inputValue" @input="handleInput" 로 바꿈
  inputValue.value = event.target.value
  if (inputValue.value) {
    autoCompleteList.value = newData.value.filter((item) => item.includes(inputValue.value));
  } else {
    autoCompleteList.value = []
  }
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
.search-view {
  p {
    margin-bottom: 10px;
    padding: 5px;
  }
}
.button-wrap {
  margin-top: 40px;
}

</style>
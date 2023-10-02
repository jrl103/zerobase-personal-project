<template>
  <div>
    <h1>Filtering</h1>
    <div class="filtering-box">
      <div v-for="(item,idx) in checkboxData" :key="'checkBoxFilter' + idx">
        <input type="checkbox" v-model="selectFilterData" :value="item.value"
               @change="handleCheckbox(item, $event)">
        <label :for="item.value">{{ item.title }}</label>
      </div>
    </div>
    <div class="select-box">
      <select v-model="selectMoneyData">
        <option v-for="(item, idx) in selectboxData"
                :key="'selectBoxFilter' + idx" :value="item.value">
          {{ item.title }}
        </option>
      </select>
    </div>

    <div v-for="(item, index) in filteringData" :key="'filterData' + index">
      <div>
        <span>{{ item.title }}</span>
        <span>{{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";

const checkboxData = [
  {
    title: '전체',
    value: 'all'
  },
  {
    title: '빨간색',
    value: 'red'
  },
  {
    title: '파란색',
    value: 'blue'
  },
  {
    title: '노란색',
    value: 'yellow'
  },
]

const selectboxData = [
  {
    title: '전체',
    value: 0,
  },
  {
    title: '0 ~ 10000',
    value: 10000,
  },
  {
    title: '10000 ~ 20000',
    value: 20000,
  },
  {
    title: '20000 ~ 30000',
    value: 30000,
  },
]

const selectFilterData = ref([])
const selectMoneyData = ref(0)
const isCheckAll = ref(false)

const handleCheckbox = (item, e) => {
  // e: check 됐는지 여부 확인 용도

  // 전체 체크
  if (item.value === 'all' && e.target.checked) {
    isCheckAll.value = e.target.checked
    selectFilterData.value = checkboxData.map((item) => {
      return item.value
    })
  } else {
    // 전체 해제
    if (item.value === 'all' && !e.target.checked && isCheckAll.value) {
      isCheckAll.value = false
      selectFilterData.value = []
    } else {
      // 전체 이외 컨트롤
      if (selectFilterData.value.length === 3 && !isCheckAll.value) {
        // 나머지 세개 전부 체크 됐을때
        isCheckAll.value = true
        selectFilterData.value = checkboxData.map((item) => {
          return item.value
        })
      }
      // 하나라도 해제되면 전체 체크 해제
      if (selectFilterData.value.length <= 3 && isCheckAll.value) {
        isCheckAll.value = false
        selectFilterData.value.splice(0, 1)
      }
    }
  }
}

const productData = [
  {
    id: 1,
    title: '빨간옷',
    color: 'red',
    price: 20000
  },
  {
    id: 2,
    title: '빨간바지',
    color: 'red',
    price: 6000
  },
  {
    id: 3,
    title: '파란옷',
    color: 'blue',
    price: 20000
  },
  {
    id: 4,
    title: '파란바지',
    color: 'blue',
    price: 25000
  },
  {
    id: 5,
    title: '노란옷',
    color: 'yellow',
    price: 12000
  },
  {
    id: 6,
    title: '노란바지',
    color: 'yellow',
    price: 30000
  },
]

const filteringData = computed(() => {
  if (isCheckAll.value || selectFilterData.value.some(item => item === 'all')) {
    return filteringMoney(productData)
  }
  const filterProductData = productData.filter(element1 => selectFilterData.value.includes(element1.color))
  return filteringMoney(filterProductData)
})

const filteringMoney = (list) => {
  if (selectMoneyData.value === 0) {
    return list
  }
  if (selectMoneyData.value === 10000) {
    return list.filter(item => item.price <= 10000)
  }
  if (selectMoneyData.value === 20000) {
    return list.filter(item => item.price <= 20000 && item.price > 10000)
  }
  if (selectMoneyData.value === 30000) {
    return list.filter(item => item.price <= 30000 && item.price > 20000)
  }
}

</script>
<style scoped lang="scss">
.filteringBox {
  display: flex;
}
</style>
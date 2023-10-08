<template>
  <div class="infinity-scroll">
    <div class="button-wrap">
      <FormButton :title="'등록'" @click-button="handleModalView"/>
    </div>

    <div class="food-list-wrap">
      <div class="food-item" v-for="(item, idx) in processFoodList"
           :key="'foodItem-' + idx ">
        <PagenationItem :title="item.title" :contents="item.content"/>
      </div>
    </div>
    <ModalView v-if="showModal" @click-close="handleModalView"
               @rerender-item="getFoodList"/>
  </div>
</template>

<script setup>
import ModalView from "@/components/commons/modal/ModalView.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {collection, getDocs, getFirestore} from "firebase/firestore/lite";
import firebase from "@/firebaseConfig";
import PagenationItem from "@/components/contents/cards/PagenationItem.vue";
import FormButton from "@/components/contents/buttons/FormButton.vue";

const showModal = ref(false)
const hasScrollPercent = ref(false)

// 무한스크롤 위해 가공
const realFoodList = ref([])
const processFoodList = ref([])

const handleModalView = () => {
  showModal.value = !showModal.value
  if (showModal.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}
const getFoodList = async () => {
  const test = collection(getFirestore(firebase), 'food')

  const foodData = await getDocs(test)

  let result = []
  foodData.forEach((item) => {
    const fileds = item._document.data.value.mapValue.fields
    result.push({
      title: fileds.title.stringValue,
      content: fileds.content.stringValue
    })
  })
  console.log('result1', result)

  processFoodList.value = result.splice(0, 10)
  console.log('processFoodList.value', ...processFoodList.value)
  // 원본 배열 : 10개만 보여줘야되니까 전체에서 10개를 뺀 나머지 넣기
  realFoodList.value = result
}

const checkScrollLocation = () => {
  // 현재 스크롤 위치
  const nowScrollHeight = window.scrollY
  // 전체 스크롤 가능한 높이 (전체 페이지 높이 - 뷰포트 높이)
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
  // 90%에 해당하는 위치
  const wishScrollHeight = scrollableHeight * 0.5

  if (!hasScrollPercent.value && nowScrollHeight >= wishScrollHeight && processFoodList.value.length > 0) {
    console.log('진입했어요!!')

    processFoodList.value.push(...realFoodList.value.splice(0, 10))
    // processFoodList.value = processFoodList.value.map((element1) => {
    //   return {
    //     ...element1,
    //     ...realFoodList.value.splice(0, 10)
    //   }
    // })

    hasScrollPercent.value = true
    setTimeout(() => {
      hasScrollPercent.value = false
    }, 500)
  }
}

onMounted(() => {
  getFoodList()
  window.addEventListener('scroll', checkScrollLocation)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollLocation)
})
</script>

<style scoped lang="scss">
.button-wrap {
  margin: 50px 0;
}

.infinity-scroll {
  position: relative;
  width: 100%;
}

.food-item {
  margin-bottom: 30px;
}
</style>
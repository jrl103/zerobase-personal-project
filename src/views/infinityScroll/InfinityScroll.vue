<template>
  <div class="infinity-scroll">
    <div class="button-wrap">
      <FormButton :title="'등록'" @click-button="handleModalView"/>
    </div>

    <div class="food-list-wrap">
      <div class="food-item" v-for="(item, idx) in foodList"
           :key="'foodItem-' + idx ">
        <PagenationItem :title="item.title" :contents="item.content"/>
      </div>
    </div>
    <ModalView v-if="showModal" @click-close="handleModalView"/>
  </div>
</template>

<script setup>
import ModalView from "@/components/commons/modal/ModalView.vue";
import {onMounted, ref} from "vue";
import {collection, getDocs, getFirestore} from "firebase/firestore/lite";
import firebase from "@/firebaseConfig";
import PagenationItem from "@/components/contents/cards/PagenationItem.vue";
import FormButton from "@/components/contents/buttons/FormButton.vue";

const showModal = ref(false)
const foodList = ref([])
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
  foodList.value = result
}

onMounted(() => {
  getFoodList()
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
  margin-bottom: 10px;
}
</style>
<template>
  <div>
    <div class="container">
      <ul>
        <li v-for="(item, index) in likeData" :key="'wish' + index">
          <p>{{ item.title }}</p>
          <button
              @click="item.isLike ? deleteWishBtn(item.id) : clickWishBtn(item.id)">
            {{ item.isLike ? '좋아하지 않아요' : '좋아요' }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const route = useRouter()
const acessTokenKey = ref('')
const accessTokenValue = ref('')
const likeData = ref([])

const setData = () => {
  const data = [
    {
      id: 1,
      title: '첫번째 상품',
      isLike: false
    },
    {
      id: 2,
      title: '두번째 상품',
      isLike: false
    },
    {
      id: 3,
      title: '세번째 상품',
      isLike: false
    },
    {
      id: 4,
      title: '네번째 상품',
      isLike: false
    }
  ]
  const parsingData = JSON.parse(localStorage.getItem('wishList'))

  if (!parsingData) {
    likeData.value = data
  } else {
    const filterData = data.map((item) => {
      if (parsingData.includes(item.id)) {
        return {
          ...item,
          isLike: true
        }
      } else {
        return {
          ...item
        }
      }
    })
    likeData.value = filterData
  }
}

const clickWishBtn = (itemId) => {
  const setData = [itemId]
  if (localStorage.getItem('wishList')) {
    const compareLocalList = JSON.parse(localStorage.getItem('wishList'))
    const resultData = compareLocalList.concat(setData)
    localStorage.setItem('wishList', JSON.stringify(resultData))
  } else {
    localStorage.setItem('wishList', JSON.stringify(setData))
  }
  likeData.value.forEach((item) => {
    if (item.id === itemId) {
      item.isLike = true
    }
  })
}

const deleteWishBtn = (itemId) => {
  const compareLocalList = JSON.parse(localStorage.getItem('wishList'))
  const filterData = compareLocalList.filter((item) => item !== itemId)

  localStorage.setItem('wishList', JSON.stringify(filterData))

  likeData.value.forEach((item) => {
    if (item.id === itemId) {
      item.isLike = false
    }
  })
}

onMounted(() => {
  const test2 = new Array(document.cookie)
  test2.forEach((item) => {
    const divide1 = item.split(';')

    divide1.forEach((item2) => {
      const divide2 = item2.split('=')
      if (divide2[0] === 'accessToken') {
        acessTokenKey.value = divide2[0]
        accessTokenValue.value = divide2[1]
      }
    })
  })
  if (!accessTokenValue.value) {
    alert('로그인이 필요합니다.')
    route.push('/')
  }
  setData()
})
</script>

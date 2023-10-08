<template>
  <div>
    <div class="img-list-wrap">
      <div :class="item.isShow ? 'img-list-item' : 'img-list-item is-hidden'"
           v-for="(item, index) in pageTitleData" :key="'item' + index">
        <ImgTitleContentsCard :title="item.title" :img-url="item.imgUrl"
                              @onClickEvt="item.id === 'logout' ? logOut() : clickNav(item)"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import ImgTitleContentsCard
  from "@/components/contents/cards/ImgTitleContentsCard.vue";
import {useRouter} from "vue-router";

const route = useRouter()
const acessTokenKey = ref('')
const accessTokenValue = ref('')
const pageTitleData = ref([
  {
    id: 'signup',
    isShow: true,
    title: '회원가입',
    imgUrl: require('@/assets/icon/icon-signup.png'),
    moveUrl: '/signup'
  },
  {
    id: 'login',
    isShow: true,
    title: '로그인',
    imgUrl: require('@/assets/icon/icon-user.png'),
    moveUrl: '/login'
  },
  {
    id: 'logout',
    isShow: true,
    title: '로그아웃',
    imgUrl: require('@/assets/icon/icon-user.png')
  },
  {
    id: 'pagenation',
    isShow: true,
    title: '페이지네이션',
    imgUrl: require('@/assets/icon/icon-pagenation.png'),
    moveUrl: '/pagenation'
  },
  {
    id: 'search',
    isShow: true,
    title: '검색',
    imgUrl: require('@/assets/icon/icon-search.png'),
    moveUrl: '/search'
  },
  {
    id: 'wishlist',
    isShow: true,
    title: '위시리스트',
    imgUrl: require('@/assets/icon/icon-wish.png'),
    moveUrl: '/wishList'
  },
  {
    id: 'filtering',
    isShow: true,
    title: '상품 필터링',
    imgUrl: require('@/assets/icon/icon-product-filtering.png'),
    moveUrl: '/filtering'
  },
  {
    id: 'infinityScroll',
    isShow: true,
    title: '무한 스크롤',
    imgUrl: require('@/assets/icon/icon-product-filtering.png'),
    moveUrl: '/infinityScroll'
  },
])

const checkIsShowList = () => {
  pageTitleData.value.forEach((item) => {
    if (accessTokenValue.value) {
      if (item.id === 'signup' || item.id === 'login') {
        item.isShow = false
      }
    } else {
      if (item.id === 'logout' || item.id === 'wishlist') {
        item.isShow = false
      }
    }
  })
}

const logOut = () => {
  document.cookie = 'accessToken' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  alert('로그아웃 되었습니다.')
  pageTitleData.value.forEach((item) => {
    if (item.id === 'signup' || item.id === 'login') {
      item.isShow = true
    }
    if (item.id === 'logout' || item.id === 'wishlist') {
      item.isShow = false
    }
  })
}

const clickNav = (item) => {
  route.push(`${item.moveUrl}`)
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

  checkIsShowList()
})
</script>
<style scoped lang="scss">
.img-list-item {
  margin: 20px 0;

  &.is-hidden {
    display: none;
  }
}
</style>
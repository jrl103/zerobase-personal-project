import { createApp } from 'vue'
import App from './App.vue'

import routes from './router/router'

const app = createApp(App)
// eslint-disable-next-line no-undef
const KAKAO_API_KEY = '5c31692db21a24a9abeeff7e5d41ec12'
// eslint-disable-next-line no-undef
Kakao.init(KAKAO_API_KEY)

app.use(routes)
app.mount('#app')
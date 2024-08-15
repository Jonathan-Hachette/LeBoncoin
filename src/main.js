import './assets/main.css'

import { createApp, ref } from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faClock,
  faEye,
  faEyeSlash,
  faHeart,
  faPlusSquare,
  faUser
} from '@fortawesome/free-regular-svg-icons'

import {
  faAngleLeft,
  faAngleRight,
  faArrowRight,
  faCheckDouble,
  faCircle,
  faMapMarkerAlt,
  faSearch,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faCircle,
  faPlusSquare,
  faUser,
  faSearch,
  faHeart,
  faCheckDouble,
  faClock,
  faMapMarkerAlt,
  faAngleLeft,
  faAngleRight,
  faArrowRight,
  faSignOutAlt,
  faEyeSlash,
  faEye
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueCookies)

const userInfos = ref($cookies.get('userInfos') || null)

const changeUserInfos = (infos) => {
  userInfos.value = infos
}

app.provide('GlobalStore', {
  userInfos: userInfos,
  changeUserInfos: changeUserInfos
})

app.mount('#app')

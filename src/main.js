import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faClock, faHeart, faPlusSquare, faUser } from '@fortawesome/free-regular-svg-icons'

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
  faSignOutAlt
)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

const userToken = ref('test')

const changeToken = (token) => {
  userToken.value = token
}

app.provide('GlobalStore', {
  userToken: userToken,
  changeToken: changeToken
})

app.mount('#app')

import LoginView from '@/views/LoginView.vue'
import OfferView from '@/views/OfferView.vue'
import SignupView from '@/views/SignupView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => {
        return {
          page: parseInt(route.query.page) || 1,
          title: route.query.title || '',
          sort: route.query.sort || '',
          pricemin: Number(route.query.pricemin) || '',
          pricemax: Number(route.query.pricemax) || ''
        }
      }
    },
    {
      // Cette route contient un params'id'
      path: '/offer/:id',
      name: 'offer',
      component: OfferView,
      // La params sera reçu en props par le composant
      props: true
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router

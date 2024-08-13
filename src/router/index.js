import OfferView from '@/views/OfferView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // Cette route contient un params'id'
      path: '/offer/:id',
      name: 'offer',
      component: OfferView,
      // La params sera reçu en props par le composant
      props: true
    }
  ]
})

export default router

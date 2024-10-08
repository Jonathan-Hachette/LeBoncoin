import { inject } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import NotFoundView from '@/views/NotFoundView.vue'
import PaymentView from '@/views/PaymentView.vue'
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => ({
        title: route.query.title || '',
        page: parseInt(route.query.page) || 1,
        sort: route.query.sort || '',
        pricemin: Number(route.query.pricemin) || '',
        pricemax: Number(route.query.pricemax) || ''
      })
    },
    {
      path: '/offer/:id',
      name: 'offer',
      props: true,
      component: () => import('../views/OfferView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/publish',
      name: 'publish',
      // Ajout des Meta Fields
      meta: { requireAuth: true },
      component: () => import('../views/PublishView.vue')
    },
    {
      path: '/payment/:id',
      name: 'payment',
      props: true,
      meta: { requireAuth: true },
      component: PaymentView
    },
    {
      path: '/profile',
      name: 'profile',
      props: true,
      meta: { requireAuth: true },
      component: ProfileView
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFoundView
    }
  ],
  // Pour toujours revenir en haut de la page lorsqu'on navigue
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

// Définition du 'Global Before Guards'
router.beforeEach((to, from) => {
  // Injection du fournisseur de dépendance
  const GlobalStore = inject('GlobalStore')

  if (to.meta.requireAuth && !GlobalStore.userInfos.value.token) {
    //   👆 La route requière une authentification et 👆 l'utilisateur n'est pas connecté => donc on le redirige

    return { name: 'login', query: { redirect: to.path } }
    // Ajout d'une query 'redirect' pour savoir quelle page l'utilisateur avait demandé avant d'être redirigé
  }
})

export default router

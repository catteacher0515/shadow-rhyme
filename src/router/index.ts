import { createRouter, createWebHistory } from 'vue-router'
import Splash from '@/views/Splash.vue'
import MainHall from '@/views/MainHall.vue'

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: Splash,
  },
  {
    path: '/main-hall',
    name: 'MainHall',
    component: MainHall,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

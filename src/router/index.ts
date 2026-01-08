import { createRouter, createWebHistory } from 'vue-router'
import Splash from '@/views/Splash.vue'
import MainHall from '@/views/MainHall.vue'
import Workshop from '@/views/Workshop.vue'

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
  },
  {
    path: '/workshop',
    name: 'Workshop',
    component: Workshop,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

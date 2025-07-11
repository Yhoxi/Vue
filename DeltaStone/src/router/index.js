import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',redirect:'/login'},

    {path: '/login',component: () => import('../views/Login.vue')},
    {path: '/adminhome',component: () => import('../views/AdminHome.vue')},
    {path: '/userhome',component: () => import('../views/UserHome.vue')},

  ],
})

export default router

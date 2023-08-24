// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Trang chủ',
        component: () => import('@/views/home.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue'),
      },
      {
        path: '/user',
        name: 'User Profile',
        component: () => import('@/views/user.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

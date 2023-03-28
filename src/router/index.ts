import { createRouter, createWebHashHistory, Router } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/information',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/information',
        component: () => import('@/views/information/index.vue'),
        meta: { title: '数据资源' },
      },

    ],
  },
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router

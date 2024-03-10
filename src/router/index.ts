import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './router';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !window.localStorage.getItem('token')) {
    next({
      name: 'login'
    })
  }
  next()
})

router.afterEach((to) => {
  document.title = `后台管理-${to.meta.title as string || '后台管理系统'}` 
})

export default router

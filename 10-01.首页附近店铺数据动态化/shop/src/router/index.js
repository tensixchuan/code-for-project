import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName:'home_123123' */ '../views/home/Home')
  },
  {
    path: '/shop',
    name: 'shop',
    // component: Shop
    component: () => import(/* webpackChunkName:'shop_123123' */ '../views/shop/Shop')
  },
  {
    path: '/register',
    name: 'register',
    // component: Register
    component: () => import(/* webpackChunkName:'register_123123' */ '../views/register/Register')
  },
  {
    path: '/login',
    name: 'login',
    // component: Login
    component: () => import(/* webpackChunkName:'login_123123' */ '../views/login/Login')
    // beforeEnter (to, from, next) {
    //   console.log(from, to)
    //   const isLogin = localStorage.isLogin
    //   console.log('beforeEnterLogin', isLogin)
    //   isLogin ? next({ name: 'home' }) : next()
    // }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'login' || name === 'register');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'login' })
  console.log(from, to)
  console.log(isLogin, isLoginOrRegister, isLogin || isLoginOrRegister)
})
export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import Register from '../views/register/Register'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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

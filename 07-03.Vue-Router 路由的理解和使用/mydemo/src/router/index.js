import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // 可以异步加载路由
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    }, {
        name: 'Login',
        path: "/login",
        component: Login
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
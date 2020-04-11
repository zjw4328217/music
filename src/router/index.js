import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo.vue')
  },
  {
    path: '/toplist',
    name: 'toplist',
    component: () => import('@/views/toplist.vue'),
  
  },
  {
    path:'/toplist/toplistdetail',
    name:'toplistdetail',
    component:() => import('@/views/toplistdetail.vue'),
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import('@/views/playlist.vue')
  },
  {
    path: '/player',
    name: 'player',
    component: () => import('@/views/player.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

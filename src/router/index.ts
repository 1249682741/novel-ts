import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/views/Layout/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component:  () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
  },
  {
    path: '/book',
    name: 'Book',
    redirect: '/book/list',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'book_list',
        component: () => import( /* webpackChunkName: "book" */ '@/views/Book/List.vue'),
      }
    ]
  },
  {
    path: '/canvas',
    name: 'Canvas',
    component: () => import( /* webpackChunkName: "canvas" */ '@/views/CanvasImg/demo.vue'),
  },
  {
    path: '/tag',
    component: Layout,
    redirect: '/tag/tag1',
    children: [
      {
        path: 'tag1',
        name: 'tag_tag1',
        component: () => import(/* webpackChunkName: "tag" */ '@/views/Tag/tag1.vue')
      },
      {
        path: 'tag2',
        name: 'tag_tag2',
        component: () => import(/* webpackChunkName: "tag" */ '@/views/Tag/tag2.vue')
      },
      {
        path: 'tag3',
        name: 'tag_tag3',
        component: () => import(/* webpackChunkName: "tag" */ '@/views/Tag/tag3.vue')
      },
    ]
  },
  {
    path: '/tabletest',
    name: 'tabletest',
    component: () => import('@/views/TableTest/index.vue')
  },
  {
    path: '/collegemap',
    name: 'collegemap',
    component: () => import(/* webpackChunkName: "collegemap" */ '@/views/CollegeMap/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

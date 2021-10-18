import {createRouter, createWebHashHistory} from 'vue-router'
import Layout from '/@/layout/index.vue'

export const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {hidden: true,},
  },
  {
    path: '/login',
    name: 'login',
    meta: {hidden: true, title: 'login'},
    component: () => import('/@/views/login/index.vue'),
  },
  {
    path: '/hello',
    name: 'hello',
    component: Layout,
    redirect: '/hello/world',
    children: [
      {
        path: 'world',
        name: 'world',
        meta: {icon: 'el-icon-menu', title: 'world'},
        component: () => import('/@/views/hello/index.vue'),
      }
    ]
  },
  {
    path: '/sys',
    name: 'sys',
    meta: {icon: 'el-icon-menu', title: '系统设置'},
    redirect: '/syx/setting',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {icon: 'el-icon-menu', title: '用户管理'},
        component: () => import('/@/views/sys/user/index.vue'),
      },
      {
        path: 'role',
        name: 'role',
        meta: {icon: 'el-icon-menu', title: '角色管理'},
        component: () => import('/@/views/hello/index.vue'),
      },
      {
        path: 'menu',
        name: 'menu',
        meta: {icon: 'el-icon-menu', title: '菜单管理'},
        component: () => import('/@/views/sys/menu/index.vue'),
      },
    ]
  },
  {
    path: '/tools',
    name: 'tools',
    redirect: '/tools/upload',
    component: Layout,
    children: [
      {
        path: 'upload',
        name: 'upload',
        meta: {icon: 'el-icon-upload', title: '分片上传'},
        component: () => import('/@/views/tools/upload.vue')
      }
    ]
  }
]

const router  = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
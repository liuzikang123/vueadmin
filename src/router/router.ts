import { RouteRecordRaw } from 'vue-router';
import RouterView from '@/components/router-view.vue';

export const layoutList: Array<RouteRecordRaw> = [
  {
    path: 'index',
    name: 'index',
    component: () => import('@/views/index/index-list.vue'),
    meta: { title: '首页', icon: 'House' },
    children: [
      {
        path: 'edit/:id',
        name: 'indexEdit',
        component: () => import('@/views/index/index-edit.vue'),
        props: true,
        meta: { title: '首页编辑', back: 'index' },
        children: [],
      },
    ],
  },
  {
    path: 'system',
    name: 'system',
    component: RouterView,
    meta: { title: '系统设置', isMenu: true, icon: 'Tickets' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/user-list.vue'),
        meta: { title: '账号管理', icon: 'Files' },
        children: [
          {
            path: 'edit/:id?',
            name: 'userEdit',
            component: () => import('@/views/user/user-edit.vue'),
            meta: { title: '账号管理编辑', back: 'user' },
            props: true,
          },
        ],
      },
      {
        path: 'department',
        name: 'department',
        component: () => import('@/views/department/department-list.vue'),
        meta: { title: '部门管理', icon: 'Memo' },
        children: [
          {
            path: 'edit/:code?',
            name: 'departmentEdit',
            component: () => import('@/views/department/department-edit.vue'),
            meta: { title: '部门管理编辑', back: 'department' },
            props: true,
          },
        ],
      },
      {
        path: 'userPost',
        name: 'userPost',
        component: () => import('@/views/user-post/user-post-list.vue'),
        meta: { title: '岗位管理', icon: 'Crop' },
        children: [
          {
            path: 'edit/:code?',
            name: 'userPostEdit',
            component: () => import('@/views/user-post/user-post-edit.vue'),
            meta: { title: '岗位管理编辑', back: 'userPost' },
            props: true,
          },
        ],
      },
    ],
  },
];


export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login-user.vue'),
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/layout-index.vue'),
    children: [...layoutList],
    redirect: '/index'
  },
  {
    path: '',
    redirect: '/login'
  }
];
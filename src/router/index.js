import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import permission from '@/util/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import NotFound from '../views/page/NotFound.vue';
import Statistical from '../views/page/Statistical.vue';

Vue.use(VueRouter);

let isFirstAdd = true;
const asyncRoutes = [
  {
    path: '/product',
    name: 'Product',
    component: Home,
    meta: {
      title: '商品',
      hidden: false,
      icon: 'inbox',
    },
    children: [
      {
        path: 'list',
        name: 'ProductList',
        component: () => import('@/views/page/ProductList.vue'),
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
        },
      },
      {
        path: 'add',
        name: 'ProductAdd',
        component: () => import('@/views/page/ProductAdd.vue'),
        meta: {
          title: '添加商品',
          icon: 'file-add',
        },
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/page/Category.vue'),
        meta: {
          title: '商品类目',
          icon: 'project',
        },
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/statistical',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [
      {
        path: 'statistical',
        name: 'Statistical',
        component: Statistical,
        meta: {
          title: '统计',
          icon: 'line-chart',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面丢失',
      hidden: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: 'hash',
});

router.beforeEach((to, from, next) => {
  if (!isFirstAdd && to.matched.length === 0) {
    return next('/notfound');
  }
  if (to.path !== '/login') {
    if (store.state.userInfo.appkey && store.state.userInfo.username
      && store.state.userInfo.role && store.state.userInfo.email) {
      if (isFirstAdd) {
        const menu = permission.getMenuRoutes(store.state.userInfo.role, asyncRoutes);
        // routes不是响应式
        // vuex的dispatch会触发vue的更新 在nextTick（在页面重新渲染，DOM更新后执行）执行之前会执行完所有的微任务和宏任务
        // 在vuex管理模式state render之前去addRoutes 之后执行render
        store.dispatch('setMenuRoutes', routes.concat(menu)).then(() => {
          router.addRoutes(menu);
        });
        isFirstAdd = false;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;

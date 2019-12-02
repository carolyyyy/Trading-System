/**
 * @Project Name: vue-admin
 * @Author: luichooy
 * @Date: 2018-01-17 15:01
 * @Email: luichooy@163.com
 * @Idea: WebStorm
 */

import Layout from 'src/pages/layout/layout';
import Layout_sale from 'src/pages/layout/layout_sale';

export const LayoutRouter = {
  path: '/Layout',
  name: 'layout',
  meta: {
    title: 'Layout'
  },
  component: () => import('src/pages/layout/layout')
};

export const SaleRouter = {
  path: '/Layout_sale',
  name: 'layout_sale',
  meta: {
    title: 'Layout_sale'
  },
  component: () => import('src/pages/layout/layout_sale')
};
// login
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('src/pages/login/login')
};

// error page
export const errorRouter = {
  path: '/error/:code',
  name: 'error',
  meta: {
    title: 'error'
  },
  component: () =>
    import('src/pages/error/index')
};


export const otherRouter = {
  path: '',
  name: 'otherRouter',
  redirect: '/home',
  meta: {
    requireAuth: true
  },
  component: Layout,
  children: [
    {
      path: 'home',
      name: 'home',
      title: 'Main',
      component: () => import('src/pages/home/home')
    }
  ]
};


export const HomeRouter = {
  path: '',
  name: 'otherRouter',
  redirect: '/home',
  meta: {
    requireAuth: true
  },
  component:
    Layout_sale,
  children: [
    {
      path: 'home_sale',
      name: 'home',
      title: 'Main',
      component: () => import('src/pages/home/home')
    }
  ]
};
//left menu to appRouter
export const appRouter = [
  {
    path: '/tables',
    name: 'tables',
    title: 'tableManagement',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [ 
      {
        path: 'basic',
        name: 'basic',
        title: 'basicTable',
        component: () => import('src/pages/tables/basic')
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    title: 'tradeFormManagement',
    meta: {
      requireAuth: true
    },
    component: Layout,
    children: [
      {
        path: 'render',
        name: 'render',
        title: 'formTrade',
        component: () => import('src/pages/form/render/render')
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    title: 'formSaleManagement',
    meta: {
      requireAuth: true
    },
    component:Layout_sale,
    children: [
      {
        path: 'render_sale',
        name: 'render',
        title: 'formSale',
        component: () => import('src/pages/form/render/renderSale')
      }
    ]
  },
 
];

export const routers = [
  loginRouter,
  errorRouter,
  otherRouter,
  ...appRouter,
  LayoutRouter, 
  SaleRouter,
  HomeRouter
];

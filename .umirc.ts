import { render } from 'react-dom';
import { defineConfig } from 'umi';

export default defineConfig({
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: 'BasicLayout',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home',
          exact: true,
          component: 'Home',
        },
        {
          path: '/post/:id',
          component: 'PostDetail',
        },
        {
          path: 'writePost',
          component: 'PostForm',
        },
        {
          path: '/userInfo/:id',
          component: 'UserInfo',
        },
        {
          path: 'settings',
          component: 'Settings',
        },
        {
          path: 'message/:id',
          component: 'Message',
        },
      ],
    },
  ],
  fastRefresh: {},
  dva: {
    immer: true,
  },
});

import { render } from 'react-dom';
import { defineConfig } from 'umi';
import { extend} from 'umi-request'

export default defineConfig({
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
          redirect : '/home'
        },
        {
          path: '/home',
          exact: true,
          component: 'Home'
        }
      ]
    },
  ],
  fastRefresh: {},
});

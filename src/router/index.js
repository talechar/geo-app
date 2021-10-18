import VueRouter from 'vue-router';
import Vue from 'vue';
import { statement } from '@/router/statement/statementRoute';
import map from '@/router/map/mapRoute';

Vue.use(VueRouter);

const routes = [
  ...statement,
  map,
  {
    path: '/',
    name: 'index',
    redirect: { name: 'statement-view' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BABEL_URL,
  routes,
});

export default router;

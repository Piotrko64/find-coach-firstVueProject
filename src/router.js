import { createRouter, createWebHistory } from 'vue-router';
export const route = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/coaches', component: null },
    {
      path: '/coaches/:id',
      component: null,
      children: [{ path: 'contact', component: null }],
    },
    { path: '/register', component: null },
    { path: '/:notFound(.*)', component: null },
  ],
});
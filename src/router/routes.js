
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:"home", component: () => import('pages/index.vue') },
      { path: 'create', name:"create", component: () => import('pages/create.vue') },
      { path: 'about', component: () => import('pages/about.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/error404.vue')
  }
]

export default routes

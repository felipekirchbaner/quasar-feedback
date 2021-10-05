
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/feedbacks',
        name: 'feedbacks',
        component: () => import('pages/feedbacks/index.vue')
      },
      {
        path: '/feedbacks/create',
        name: 'feedback_create',
        component: () => import('src/pages/feedbacks/form.vue')
      },
      {
        path: '/feedbacks/edit/:id?',
        name: 'feedback_edit',
        component: () => import('src/pages/feedbacks/form.vue')
      },
      {
        path: '/feedbacks/show/:id?',
        name: 'feedback_show',
        component: () => import('src/pages/feedbacks/show.vue')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('pages/users/index.vue')
      }
    ]
  },
  {
    path: '/session',
    component: () => import('layouts/SessionLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/login/index.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

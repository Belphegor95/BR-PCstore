import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import(/* webpackChunkName: "about" */ '../views/Guide.vue'),
    children: [{
      path: '/guide/login',
      component: () => import('../views/guide/Login.vue'),
    },
    {
      path: '/guide/register',
      component: () => import('../views/guide/Register.vue'),
    },
    {
      path: '/guide/registerOK',
      component: () => import('../views/guide/RegisterOK.vue'),
    },
    {
      path: '/guide/find',
      component: () => import('../views/guide/Find.vue'),
    },
    ]
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import('../views/Person.vue'),
    children: [{
      path: '/person/userinfo',
      component: () => import('../views/person/Userinfo.vue'),
    },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router

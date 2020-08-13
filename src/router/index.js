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
    {
      path: '/person/orderForm',
      component: () => import('../views/person/OrderForm.vue'),
    },
    {
      path: '/person/orderDetails',
      component: () => import('../views/person/OrderDetails.vue'),
    },
    {
      path: '/person/deliveryAddress',
      component: () => import('../views/person/DeliveryAddress.vue'),
    },
    {
      path: '/person/password',
      component: () => import('../views/person/Password.vue'),
    },
    {
      path: '/person/phone',
      component: () => import('../views/person/Phone.vue'),
    },
    {
      path: '/person/coupon',
      component: () => import('../views/person/Coupon.vue'),
    },
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/sundry/Cart.vue'),
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('../views/sundry/Details.vue'),
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/sundry/Payment.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'
import ivie from "./plugins/iview"

Vue.use(less)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  ivie,
  render: h => h(App)
}).$mount('#app')

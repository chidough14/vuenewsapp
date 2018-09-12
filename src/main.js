// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import routes from './routes'
import VueRouter from 'vue-router'

import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

Vue.use(VueRouter)
 const router = new VueRouter({
   routes
 })


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

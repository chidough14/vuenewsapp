// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './routes'
import Vuetify from 'vuetify'
import Notification from 'vue-notification'
import Vuex from 'vuex'
import StoreData from './store'


import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuex)
const store = new Vuex.Store(StoreData)


Vue.use(Notification)
Vue.use(Vuetify)
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import App from './src/App.vue'
import VueRouter from 'vue-router'
import routes from './src/routers'
import {VueFormVali} from './src/plugins/index'
import './src/main.css'

Vue.use(VueRouter)
Vue.use(VueFormVali)

const router = new VueRouter({
  routes
})



let app = new Vue({
  router,
  render: h => h(App),  
}).$mount('#app');
import Vue from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import '@/assets/styles/styles.scss'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

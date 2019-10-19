import Vue from 'vue'
Vue.config.productionTip = false
import 'lib-flexible'

/* 引入iconfont */
import './assets/font_1375371_bopfvd0uilc/iconfont.css'
/* 引入css */
import './assets/css/common.css'
import App from './App'
import router from './router'
import store from '../store'


import './utils'
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

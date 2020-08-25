import Vue from 'vue'
import 'amfe-flexible'
import fastClick from 'fastclick'

// vant
import Vant from 'vant'
import 'vant/lib/index.css'

import App from './h5.vue'
import router from './router/index.js'

Vue.use(Vant)

// 300ms延迟
fastClick.attach(document.body)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

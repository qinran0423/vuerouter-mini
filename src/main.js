import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import crouter from './crouter'
Vue.config.productionTip = false

new Vue({
  crouter,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './assets/css/styles.css'
import VueSkycons from 'vue-skycon'

Vue.use(VueSkycons)


Vue.config.productionTip = false

export const appState = new Vue()

new Vue({
  render: (h) => h(App),
}).$mount('#app')

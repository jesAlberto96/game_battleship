import Vue from 'vue'
import App from './App.vue'
import Notifications from '@voerro/vue-notifications'
import VModal from 'vue-js-modal'
Vue.component('notifications', Notifications);
Vue.use(VModal)

new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})

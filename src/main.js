import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
   vuetify,
  render: function (h) {
    //this.$vuetify.theme.dark = true;
     return h(App)
   }
}).$mount('#app')

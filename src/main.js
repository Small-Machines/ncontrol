/** @format */

import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.use(VueMaterial)

import './assets/tailwind.css'

import './assets/tailwind.css'

// optionally import default styles

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,

  render: (h) => h(App),
}).$mount('#app')

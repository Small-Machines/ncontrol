<!-- @format -->

<template>
  <div data-app>
    <Nav @update:lock="updateLock" @home="home" :app_state="app_state" />
    <component
      :is="current_panel"
      :app_state="app_state"
      @update:comp="updateComponent"
    />
    <div class="flex content-around flex-wrap">
      <v-spacer></v-spacer>
      <v-alert
        v-model="alert"
        dense
        dismissible
        prominent
        type="success"
        width="200"
        >{{ alert_text }}</v-alert
      >
      <v-spacer></v-spacer>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
import Startscreen from './components/Startscreen.vue'
import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'
import Admin from './components/Admin.vue'
const conf = require('./config.json')

import io from 'socket.io-client'
var socket = io.connect('http://localhost:5500')

export default {
  name: 'App',
  components: {
    Nav,
    Startscreen,
    Home,
    Dashboard,
    Admin,
  },

  data() {
    return {
      app_locked: true,
      config: conf,

      current_panel: Startscreen,
      last_panel: null,
      alert: false,
      alert_text: null,
    }
  },
  computed: {
    app_state: function() {
      // `this` points to the vm instance
      return {
        app_locked: this.app_locked,
        config: this.config,
      }
    },
  },
  created() {
    this.setupSocketEvents()
  },
  methods: {
    home() {
      this.last_panel = this.current_panel
      this.current_panel = Home
    },
    updateLock(value) {
      this.app_locked = value
      //alert('update:lock: ' + this.app_locked)
      //      if (this.app_locked) {
      //        this.current_panel = Startscreen
      //      }
    },
    updateComponent(value) {
      this.current_panel = value
      //alert('update comp: ' + value)
    },
    setupSocketEvents() {
      socket.on('message', (message) => {
        this.alert_text = message
        this.alert = true
      })
    },
  },
}
</script>

<style>
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>

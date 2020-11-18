<!-- @format -->

<template>
  <div data-app>
    <Nav @update:lock="updateLock" @menu="menu" />
    <component :is="current_panel" :app_state="app_state" />
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

import Startscreen from './components/Startscreen.vue'
import Running from './components/Running.vue'
import Menu from './components/Menu.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Startscreen,
    Running,
  },

  data() {
    return {
      app_locked: true,

      current_panel: Startscreen,
      last_panel: null,
    }
  },
  computed: {
    app_state: function() {
      // `this` points to the vm instance
      return { app_locked: this.app_locked }
    },
  },
  methods: {
    menu() {
      this.last_panel = this.current_panel
      this.current_panel = Menu
    },
    updateLock(value) {
      this.app_locked = value
      //alert('update:lock: ' + this.app_locked)
      //      if (this.app_locked) {
      //        this.current_panel = Startscreen
      //      }
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

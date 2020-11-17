<!-- @format -->

<template>
  <div data-app>
    <Nav v-on:update:locked="updateLock($event)" />
    <component :is="current_panel" />
  </div>
</template>

<script>
import Startscreen from './components/Startscreen.vue'
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Startscreen,
  },
  data() {
    return {
      app_locked: true,
      current_panel: Startscreen,
    }
  },
  methods: {
    updateLock(value) {
      this.app_locked = value
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

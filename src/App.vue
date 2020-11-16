<!-- @format -->

<template>
  <div data-app>
    <Nav class="mb-6" v-on:update:locked="updateLock($event)" />
    <Display />
  </div>
</template>

<script>
import Display from './components/Display.vue'
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Display,
    Nav,
  },
  data() {
    return {
      app_locked: true,
    }
  },
  methods: {
    updateLock(value) {
      this.app_locked = value
    },
  },
}
</script>

<style></style>

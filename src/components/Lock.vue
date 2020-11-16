<!-- @format -->

<template>
  <div>
    <div v-html="current_path" @click="toggle" />
    <Numpad v-bind:show_numpad="show_numpad" v-on:update="checkPin($event)" />
  </div>
</template>
<script>
import Numpad from './Numpad'
export default {
  components: { Numpad },
  name: 'lock',
  props: ['app_locked'],
  data() {
    return {
      pin: '1973',
      locked: 'true',
      path_locked: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20"> <path fill="#ff0000" d="m3,9h1V6a5,5 0 0,1 12,0V9h1v11H3M14,9V6a4,4 0 1,0-8,0v3"/></svg>`,
      path_unlocked: `<svg width="28" height="40" version="1.1" viewBox="0 0 14 20" xmlns="http://www.w3.org/2000/svg"><path d="m7.042 1.4829e-4a6 6 0 0 0-6.0176 5.457c0.00401-3.4e-5 0.0077-1e-3 0.011718-1e-3h2.001a4 4 0 0 1 7.9629 0.54397v3h-7.4805c-0.055208 0.00677-0.1099 0.0166-0.16699 0.0166h-2.3164c-0.057298 1.5e-6 -0.1116-0.00978-0.16699-0.0166h-0.86914v11h14v-11h-1v-3a6 6 0 0 0-5.958-6z" style="fill:#16b73b"/></svg>`,
      current_path: null,
      show_numpad: false,
    }
  },
  watch: {
    app_locked: function(app_locked) {
      this.locked = app_locked
      this.current_path = app_locked ? this.path_locked : this.path_unlocked
    },
  },
  methods: {
    toggle() {
      if (this.locked) {
        this.show_numpad = true
      } else {
        this.locked = true
        this.$emit('update', 'locked')
        this.current_path = this.path_locked
      }
    },
    checkPin(event) {
      if (event == this.pin) {
        this.locked = false
        this.show_numpad = false
        this.$emit('update', 'unlocked')
        this.current_path = this.path_unlocked
      }
    },
  },
  mounted() {
    this.$nextTick(function() {
      this.current_path = this.path_locked
    })
  },
}
</script>

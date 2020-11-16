<!-- @format -->

<template>
  <div>
    <v-img src="@/assets/auto2.jpg" height="440" class="grey darken-4"></v-img>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  methods: {
    updateLock(value) {
      this.$emit('update:locked', value)
    },
  },
}
</script>

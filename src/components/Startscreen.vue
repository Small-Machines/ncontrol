<!-- @format -->

<template>
  <v-img
    src="@/assets/knottyer.png"
    height="480"
    width="800"
    class="grey darken-4"
  ></v-img>
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

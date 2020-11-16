<!-- @format -->

<template>
  <div>
    <component v-bind:is="currentComponent"></component>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentComponent: null,
    }
  },
  mounted() {},
  methods: {},
}
</script>

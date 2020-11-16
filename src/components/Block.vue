<!-- @format -->
<template>
  <svg width="400" height="300">
    <rect
      @click="toggleStroke"
      x="10"
      y="10"
      :width="width"
      :height="height"
      :fill="color"
      stroke="green"
      :stroke-width="stroke"
    ></rect>
    <rect
      @click="toggleStroke"
      x="20"
      y="20"
      :width="width"
      :height="height"
      :fill="color"
      stroke="green"
      :stroke-width="stroke"
    ></rect>
  </svg>
</template>
<script>
export default {
  data() {
    return { color: 'orange', width: 100, height: 100, stroke: 0 }
  },
  methods: {
    toggleStroke() {
      this.stroke == 0 ? (this.stroke = 5) : (this.stroke = 0)
    },
  },
}
</script>

<!-- @format -->

<template>
  <div>
    <v-system-bar dark color="secondary">
      <v-spacer></v-spacer>
      <v-icon>mdi-wifi-strength-4</v-icon>
      <v-icon>mdi-signal-cellular-outline</v-icon>
      <v-icon>mdi-battery</v-icon>
      <span>12:30</span>
    </v-system-bar>
    <div>
      <md-steppers :md-active-step.sync="active" md-linear>
        <md-step
          id="first"
          md-label="First Step"
          md-description="Optional"
          :md-done.sync="first"
        >
          <md-button
            class="md-raised md-primary"
            @click="setDone('first', 'second')"
            :disabled="app_locked"
            >Continue</md-button
          >
        </md-step>

        <md-step
          id="second"
          md-label="Second Step"
          :md-error="secondStepError"
          :md-done.sync="second"
        >
          <md-button
            class="md-raised md-primary"
            @click="setDone('second', 'third')"
            :disabled="app_locked"
            >Continue</md-button
          >
          <md-button
            class="md-raised md-primary"
            @click="setError()"
            :disabled="app_locked"
            >Set error!</md-button
          >
        </md-step>

        <md-step id="third" md-label="Third Step" :md-done.sync="third">
          <md-button
            class="md-raised md-primary"
            @click="setDone('third')"
            :disabled="app_locked"
            >Done</md-button
          >
        </md-step>
      </md-steppers>
    </div>
    <div class="text-center" dark color="md-primary">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :value="value"
        color="teal"
        :disabled="app_locked"
      >
        {{ value }}
      </v-progress-circular>

      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="value"
        color="primary"
      >
        {{ value }}
      </v-progress-circular>

      <v-progress-circular
        :rotate="90"
        :size="100"
        :width="15"
        :value="value"
        color="red"
      >
        {{ value }}
      </v-progress-circular>

      <v-progress-circular
        :rotate="180"
        :size="100"
        :width="15"
        :value="value"
        color="pink"
      >
        {{ value }}
      </v-progress-circular>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      app_locked: false,
      active: 'first',
      first: false,
      second: false,
      third: false,
      secondStepError: null,
      interval: {},
      value: 0,
    }
  },
  props: ['app_state'],
  watch: {
    // This would be called anytime the value of title changes
    app_state(obj) {
      if (obj.app_locked == 'locked') {
        this.app_locked = true
      } else if (obj.app_locked == 'unlocked') {
        this.app_locked = false
      }
    },
  },
  methods: {
    setDone(id, index) {
      this[id] = true

      this.secondStepError = null

      if (index) {
        this.active = index
      }
    },
    setError() {
      this.secondStepError = 'This is an error!'
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
  },
}
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}

.md-steppers {
}
</style>

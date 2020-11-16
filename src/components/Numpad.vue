<!-- @format -->

<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-alert
      v-model="alert"
      border="left"
      close-text="Close Alert"
      color="deep-purple accent-4"
      dark
      dismissible
    >
      One does not gain access to this device by simply clicking unlock...
      <br /><br />And within the time it has taken you to read this we have
      contacted the proper managment.
    </v-alert>
    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-1"
      label="Please Enter Your Pin number"
      hint="At least 4 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>
    <keyboard
      v-model="password"
      @unlock="unlock"
      @clear="clear"
      @input="changed"
      :layouts="['1234567890{clear:clear}{Unlock:unlock}', '']"
      :maxlength="8"
    ></keyboard
  ></v-dialog>
</template>

<script>
//:layouts="[
//  '1234567890{delete:backspace}|qwertyuiop|asdfghjkl|{shift:goto:1}zxcvbnm|{space:space}{custom:custom}',
//  '!@#$%^&*(){delete:backspace}|QWERTYUIOP|ASDFGHJKL|{shift:goto:0}ZXCVBNM|{space:space}{custom:custom}']"
import keyboard from 'vue-keyboard'
export default {
  name: 'Login',
  components: { keyboard },
  props: ['show_numpad'],
  data() {
    return {
      dialog: this.show_numpad,
      alert: false,
      input: '',
      show1: false,
      password: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 4 || 'Min 4 characters',
      },
    }
  },

  watch: {
    show_numpad: function(show_numpad) {
      this.dialog = show_numpad
    },
  },

  methods: {
    changed(value) {
      this.password = value
    },

    clear() {
      //this.password = ''
    },

    unlock() {
      if (this.password == '') {
        this.alert = true
      } else {
        this.$emit('update', this.password)
        this.password = ''
      }
    },
  },
}
</script>

<style>
.v-dialog {
  border: none;
  outline: none;
  padding: 8px 10px;
  min-width: 40px;
  margin: 0 2px;
  background: #e2e2e2;
  color: #666;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  border-radius: 2px;
}

.vue-keyboard-row {
  padding: 2px 0;
  text-align: center;
}
.vue-keyboard-key {
  border: none;
  outline: none;
  padding: 8px 10px;
  min-width: 80px;
  min-height: 80px;
  margin: 2px 2px;
  background: #eee;
  color: #666;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  border-radius: 2px;
}
.vue-keyboard-key:hover {
  background: #e0e0e0;
}
.vue-keyboard-key:active {
  background: #777;
  color: #fff;
  box-shadow: inset 0 1px 4px rgba(#000, 0.1);
}
.vue-keyboard-key[data-action='space'] {
  min-width: 160px;
}
</style>

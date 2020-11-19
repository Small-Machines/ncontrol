<!-- @format -->

<template>
  <div>
    <v-card elevation="2" color="secondary" dark>
      <div class="flex content-around flex-wrap">
        <v-btn
          rounded
          color="primary"
          dark
          @click.native="refresh"
          :disabled="app_locked"
        >
          Refresh List
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          rounded
          color="primary"
          dark
          @click.native="saveAssociation(selected)"
          :disabled="app_locked"
        >
          Save
        </v-btn>
      </div>
    </v-card>

    <v-card
      class="mx-auto"
      max-width="400"
      color="secondary"
      dark
      :disabled="app_locked"
    >
      <v-list two-line>
        <v-list-item-group v-model="selected" active-class="pink--text">
          <template v-for="(node, index) in nodes">
            <v-list-item :key="node.alias" dark>
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="node.alias"></v-list-item-title>

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="node.address"
                  ></v-list-item-subtitle>

                  <v-list-item-subtitle
                    v-text="node.description"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox
                    :input-value="active"
                    color="primary"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider v-if="index < nodes.length - 1" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
    <br />
  </div>
</template>

<script>
import io from 'socket.io-client'
var socket = io.connect('http://localhost:5500')

export default {
  name: 'Home',
  data() {
    return {
      app_locked: false,
      nodes: [],
      selected: null,
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
  created() {
    this.setupSocketEvents()
    this.refresh()
  },

  methods: {
    refresh() {
      socket.emit('request', { req: 'get/nodes' })
    },

    saveAssociation(select) {
      console.log('my selected: ' + select)
      this.alert = false
      socket.emit('request', {
        req: 'save/node/selected',
        payload: this.nodes[select],
      })
    },

    setupSocketEvents() {
      socket.on('nodes', (nodes) => {
        let _ns = []
        let _i = 0
        Object.keys(nodes).forEach((node) => {
          if (nodes[node].selected == true) {
            console.log('elected idx: ' + _i + ' ' + nodes[node].alias)
            this.selected = _i
          }
          _ns.push(nodes[node])
          _i++
        })
        console.log('nodes: ' + JSON.stringify(_ns))
        this.nodes = _ns
      })
    },
  },
}
</script>

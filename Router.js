/** @format */

// -----------------------------------------------------------------------------
// ----------------------  component -----------------------------------------
// class object that represents our component
//
// -----------------------------------------------------------------------------
const Events = require('events')
const Debug = require('debug')
let debug = Debug('dna:hmi:router')
const NanoTimer = require('nanotimer')
const fs = require('fs')

const NodeDiscover = require('node-discover')
const ip = require('ip')

const redis = require('redis')
var rclient = null
//var rsub = null

class HMIRouter extends Events {
  constructor() {
    super()
    this.config = require('./router_config.json')
    this.ip = ip.address
    this.main_timer = new NanoTimer()
    this.HMI_server = require('socket.io')(this.config.socket_port, {
      pingTimeout: 60000,
      cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
      },
    })
    this.discovery = new NodeDiscover(this.config.discovery)

    this.nodes = {}

    this.setupEvents()
    this.setup()
  }

  setupEvents() {
    // internal events
    // this.events.on('eventName', (args) => { your function stuff})

    debug('started discovery')

    this.discovery.on('added', (obj) => {
      debug('A new node has been added.' + JSON.stringify(obj))
    })
    //TODO: remove node from nodes when they fall off
    this.discovery.on('removed', (obj) => {
      this.emit('node/removed', obj)
    })

    this.discovery.on('helloReceived', (obj) => {
      if (obj.advertisement) {
        this.emit('node/registered', obj)

        let _n = {
          alias: obj.advertisement.alias,
          description: obj.advertisement.description,
          address: obj.advertisement.ip,
        }
        if (this.config.node.address == obj.advertisement.ip) {
          _n.selected = true
        }

        this.nodes[obj.advertisement.id] = _n
        //TODO: put on timer
        //this.hmi_server.sockets.emit('nodes', this.nodes)
        //debug('new node.' + JSON.stringify(this.nodes))
      }
    })

    debug('DISCOVerY running')

    let _t = this
    this.HMI_server.on('connection', (HMI) => {
      debug('HMI: ' + HMI.id + ' connected.')

      HMI.on('request', (req) => {
        debug(HMI.id + ' made request :', req)
        _t.handleRequest(req, HMI)
        // We need to remove socket
      })

      HMI.on('disconnect', () => {
        debug(HMI.id + ' has been removed')
        // We need to remove socket
      })
    })
    debug('HMI events setup')
  }

  setup() {
    if (this.config.node) {
      this.connectToNode()
    }
  }

  connectToNode() {
    let _t = this
    var cnt = 0
    var max = 10 //this.manifest.redis_conn_count
    rclient = redis.createClient(
      this.config.redis_conn_port,
      this.config.node.address,
      {
        password: this.config.redis_conn_pass,
      }
    )
    rclient.on('error', function(error) {
      debug(error)
      _t.HMI_server.sockets.emit('message', error)
      if (cnt == max) {
        _t.HMI_server.sockets.emit('message', 'redis-client/failed')
        debug(
          'Router cannot connect to redis Server after',
          max,
          ' attempts - exiting'
        )
        process.exit(1)
      }
      cnt++
      debug('cnt: ', cnt, 'max: ', max)
    })
    this.HMI_server.sockets.emit('message', 'redis-client/started')
    this.emit('message', 'redis-client/started')
    debug('redis created')
  }

  handleRequest(msg, HMI) {
    switch (msg.req) {
      case 'get/nodes': {
        HMI.emit('nodes', this.nodes)

        break
      }
      case 'save/node/selected': {
        this.config.node = msg.payload
        let _c = JSON.stringify(this.config)
        fs.writeFile('./router_config.json', _c, (err) => {
          if (err) debug(err)
          debug('Config file saved')
          HMI.emit('message', 'Selection Saved')
          this.connectToNode()
        })
        break
      }
    }
  }

  cycle() {
    // TODO: decide if HMI's need to be controlled or just interns...
    debug('ADVERT')
    this.discovery.advertise(this.advertisement)
  }
} // end class

new HMIRouter()

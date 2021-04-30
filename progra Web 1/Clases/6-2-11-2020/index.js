const createEventEmitter = require('./event_emitter.js')

const myEventEmitter = createEventEmitter()

myEventEmitter.on('hey', () => { console.log('ho') })
myEventEmitter.on('hey', () => { console.log('ho!!') })
myEventEmitter.on('hello', () => { console.log('bye') })

myEventEmitter.emit('hey', undefined)
myEventEmitter.emit('hello', undefined)
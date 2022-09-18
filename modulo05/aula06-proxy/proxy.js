'use strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter'

event.on(eventName, (message) => console.log('counter updated', message))

const myCounter = {
  counter: 0,
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true
  },
  get: (target, propertyKey) => {
    // console.log('chamou!', { target, propertyKey })
    return target[propertyKey]
  },
})

// ja já e sempre!
setInterval(function () {
  proxy.counter += 1
  console.log('[3]: interval')

  if (proxy.counter === 10) {
    clearInterval(this)
  }
}, 200)

// se quer que executa agora
setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter)
})

// futuro
setTimeout(() => {
  proxy.counter = 4
  console.log('[2]: timeout')
}, 100)

// executa agora, agorinha, mas acaba com o ciclo de vida do Node

process.nextTick(() => {
  proxy.counter = 2
  console.log('[0]: nextTick')
})

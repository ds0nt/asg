import redis from 'then-redis'

let db = redis.createClient()

export default {
  template: {
    async get(name) {
      let key = `template-${name}`
      let src = await db.get(key)
      return src
    },
    list: async() => await db.keys("template*"),
    async save(name, src) {
      let key = `template-${name}`
      return await db.set(key, src)
    }
  },
  config: {
    async get(name) {
      let key = `config-${name}`
      let src = await db.get(key)
      return src
    },
    async list() {
      return await db.keys("config*")
    },
    async save(name, src) {
      let key = `config-${name}`
      return await db.set(key, src)
    }
  }
}


// // Simple set, incrby, and get
// db.set('my-key', 1)
// db.incrby('my-key', 5)
// db.get('my-key').then(function (value) {
//   assert.strictEqual(value, 6)
// })

// // Multi-key set/get
// db.mset({ a: 'one', b: 'two' })
// db.mget('a', 'b').then(function (values) {
//   assert.deepEqual(values, [ 'one', 'two' ])
// })

// // Sets
// db.sadd('my-set', 1, 2, 3)
// db.sismember('my-set', 2).then(function (value) {
//   assert.strictEqual(value, 1)
// })

// // Hashes
// let originalHash = { a: 'one', b: 'two' }
// db.hmset('my-hash', originalHash)
// db.hgetall('my-hash').then(function (hash) {
//   assert.deepEqual(hash, originalHash)
// })

// // Transactions
// db.multi()
// db.incr('first-key')
// db.incr('second-key')
// db.exec().then(function (reply) {
//   assert.deepEqual(reply, [ 1, 1 ])
// })

// // Pubsub
// let subscriber = redis.createClient()
// subscriber.on('message', function (channel, message) {
//   console.log('Received message: ' + message)
// })
// subscriber.subscribe('my-channel').then(function () {
//   db.publish('my-channel', 'a message')
// })

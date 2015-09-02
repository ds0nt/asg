/**
 * Redis
 */
import redisAdapter from 'then-redis'
import redisConfig from './config/redis'

let redis = redisAdapter.createClient(redisConfig)

redis.on("ready", r => console.log(`Redis Connected: ${redis.host}:${redis.port}`))
redis.on("error", err => { throw err })

export default redis




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

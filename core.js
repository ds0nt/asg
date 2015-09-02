import redis from './redis'

let templates = {
  async create(name, data) {
    return await redis.set(name, data)
  },
  async read(name) {
    return await redis.get(name)
  },
  async list() {
    return await redis.keys('*')
  }
}

export default {
  templates
}

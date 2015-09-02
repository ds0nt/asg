import db from './redis'

let templates = {
  async create(name, data) {
    return await db.set(name, data)
  },
  async read(name) {
    return await db.get(name)
  },
  async list() {
    return await db.keys('*')
  }
}

import loader from './lib/loader'

let site = {
  render(name, config) {
    let generated = loader.render(name, config);
    console.log(generated)
    return generated;
  }
}

export default {
  templates,
  site
}

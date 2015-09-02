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

import loader from './loaders/folder'

let stash = loader('./site')

let site = {
  render(name, config) {
    let run = stash.template(name)
    let data = stash.config(config)
    let merged = run(data)
    console.log(merged)
    return merged;
  }
}

export default {
  templates,
  site
}

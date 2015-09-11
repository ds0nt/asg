import { get, post, delete } from 'axios'
import config from '../config'
let host = config.dray.host
let url = s => host + s

export default {
  all: async() => {
    let { data } = await get(url`/jobs`)
    return data
  },
  fetch: async(id) => {
    let { data } = await get(url`/jobs/${id}`)
    return data
  },
  log: async(id) => {
    let { data } = await get(url`/jobs/${id}/log`)
    return data
  },
  spawn: async() => {
    let { data } = await post(url`/jobs`)
    return data
  },
  kill: async(id) => {
    let { data } = await delete(url`/jobs/{id}`)
    return data
  },
}

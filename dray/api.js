import { get, post, delete } from 'axios'
import config from '../config'
let host = config.dray.host

export default {
  all: async() => {
    let res = await get(`${host}/jobs`)
    console.log(res)
    return res.data
  },
  fetch: async(id) => {
    let { data } = await get(`${host}/jobs/${id}`)
    return data
  },
  log: async(id) => {
    let { data } = await get(`${host}/jobs/${id}/log`)
    return data
  },
  spawn: async(options) => {
    let { data } = await post(`${host}/jobs`, options)
    return data
  },
  kill: async(id) => {
    let { data } = await delete(`${host}/jobs/${id}`)
    return data
  },
}

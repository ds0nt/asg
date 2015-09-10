import axios from 'axios'

let host = 'http://localhost:8080'

function store({loadfn, fetchfn, savefn}) {
  this.keys = []
  this.items = {}

  let load = async () => {
    return await axios.get(`${host}${loadfn}`)
  }

  let fetch = async (key) => {
    return await axios.get(`${host}${fetchfn}/${key}`)
  }

  let save = async (key, data) => {
    return await axios.post(`${host}${savefn}/${key}`, { data } )
  }

  return {
    load,
    fetch,
    save,
  }
}

export let templates = new store({
  loadfn: `/template`,
  fetchfn: `/template`,
  savefn: `/template`,
})

export let configs = new store({
  loadfn: `/config`,
  fetchfn: `/config`,
  savefn: `/config`,
})

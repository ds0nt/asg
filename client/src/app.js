require("babelify/polyfill")

import { render, tree } from 'deku'
import element from 'virtual-element'

import Codebox from './alpha-codebox'
import Tree from './alpha-tree'

import axios from 'axios'
let host = 'http://localhost:8080'

let template = {
  async list() {
    let { data } = await axios.get(`${host}/template`)
    return data;
  },
  save(tpl, data) {
    return axios.post(`${host}/template/${tpl}`, { data })
  },
  fetch(tpl) {
    return axios.get(`${host}/template/${tpl}`)
  },
}
let config = {
  async list() {
     let { data } = await axios.get(`${host}/config`)
     return data;
  },
  save(yml, data) {
     return axios.post(`${host}/config/${yml}`, { data } )
  },
  fetch(yml) {
     return axios.get(`${host}/config/${yml}`)
  },
}


let open = async(type, name) =>
  type === 'template' ? await template.fetch(name) : await config.fetch(name)

let openFile = c => {
  console.log(c)
  // open(c.state.type, c.state.selection
}



let app = tree(
  <div class="ui grid container">
    <div class="four wide column">
      <Tree onSelect={openFile} />
    </div>
    <div class="twelve wide column">
      <Codebox title="stfu">stfu</Codebox>
    </div>
  </div>
)

app.set('treeData', async() => ({
  templates: await template.list(),
  configs: await config.list()
}))

app.set('treeItemSelected', async(key) => {
  let [_, type, name] = key.match(/^([^-]+)-(.+)$/)

  let { data } = type == 'template'
    ? await template.fetch(name)
    : await config.fetch(name)

    app.set('item', { type, name, data })
})

render(app, document.getElementById('list'))

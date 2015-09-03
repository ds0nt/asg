require("babelify/polyfill")

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
let engine = {
  render(tpl, yml) {
    return axios.post(`${host}/render/${tpl}`, { config: yml } )
  }
}

let api = {
  template,
  config,
  engine
}


require('codemirror/mode/javascript/javascript')
require('codemirror/mode/css/css')
require('codemirror/mode/htmlmixed/htmlmixed')
import codebox from 'codemirror'
let box = codebox.fromTextArea(document.getElementById('code'), {
  mode: 'htmlmixed',
  theme: 'monokai',
  inputStyle: "contenteditable",
  lineNumbers: true,
})

import element from 'virtual-element'
import { render, tree } from 'deku'


let List = {
  afterMount(c,el,setState) {
    template.list().then(data => setState({ templates: data }))
    config.list().then(data => setState({ configs: data }))
  },
  render({ props, state }) {
    let {templates=[],configs=[]} = state
    templates = templates.map(
      i => <li onClick={() => props.selectTemplate(i)}>{i}</li>
    )
    configs = configs.map(
      i => <li onClick={() => props.selectConfig(i)}>{i}</li>
    )
    return <ul>
      <li class="list-title">TEMPLATES</li>
      {templates}
      <li class="list-title">CONFIGS</li>
      {configs}
    </ul>
  }
}
let selectedTemplate = null
let onSelectTemplate = async(i) => {
  if (selectedTemplate) {
    await template.save(selectedTemplate, box.getValue())
  }
  selectedTemplate = i
  let res = await template.fetch(i)
  box.setValue(res.data)
}

let selectedConfig = null
let onSelectConfig = async(i) => {
  if (selectedConfig) {
    await config.save(selectedConfig, box.getValue())
  }
  selectedConfig = i
  let res = await config.fetch(i)
  box.setValue(res.data)
}

let dom = tree(<div>
  <List selectTemplate={onSelectTemplate} selectConfig={onSelectConfig} />
</div>)

render(dom, document.getElementById('list'))




console.dir(template.list())

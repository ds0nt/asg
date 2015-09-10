import url from 'url'
import handlebars from 'handlebars'
import yaml from 'js-yaml'
import fs from 'then-fs'
import client from './loaders/redis'

let context = {
  project: {
    async create(path) {
    	await fs.mkdir(path)
    	await fs.writeFile(join(path, 'asg.yml'))
      return path
    }
  }
}

let render = async(tpl, yml) => {
  let [ template, config ] = [
    await client.template.get(tpl),
    await client.config.get(yml),
  ]
  config = yaml.safeLoad(config)
  let doRender = handlebars.compile(template)
  return doRender(config)
}

let engine = {
  render: render,
  serve: async(name) => {
    let [tpl, yml] = name.split('+')
    return await render(tpl, yml)
  }
}

export default ({target}) => {

  return {
    template: client.template,
    config: client.config,
    engine: engine
  }
}

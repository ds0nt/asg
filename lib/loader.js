import hbs from 'handlebars'
import yaml from 'js-yaml'

import config from '../config/loader.json'

let loader = require(`../loaders/${config.name}`)(config.args)

function render(template, config) {
  template = hbs.compile(loader.template(template))
  config = yaml.safeLoad(loader.config(config))
  return template(config)
}

export default {
  render
}

var loader;
if (process.env['ASGDATA'] === 'redis') {
  loader = require('./loaders/redis')
} else {
  loader = require('./loaders/folder')
}

let template = {
  save: loader.saveTemplate,
  get: loader.getTemplate,
  list: loader.listTemplates,
}

let config = {
  save: loader.saveConfig,
  get: loader.getConfig,
  list: loader.listConfigs,
}

import handlebars from 'handlebars'
import yaml from 'js-yaml'

let engine = {
  async render(templateName, configName) {
    let rawConfig = await loader.getConfig(configName)
    let config = yaml.safeLoad(rawConfig)

    let rawTemplate = await loader.getTemplate(templateName)
    let compiler = handlebars.compile(rawTemplate)

    let result = compiler(config)
    return result;
  },
}

export default {
  template,
  config,
  engine,
}

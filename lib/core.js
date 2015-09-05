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

export default ({target}) => {  

  return {
    template: client.template,
    config: client.config,
    engine: {
      render: async(tpl, config) => {
        config = await client.config.get(config)
        config = yaml.safeLoad(config)

        let rawTemplate = await client.template.get(tpl)
        let compiler = handlebars.compile(rawTemplate)

        let result = compiler(config)
        return result;
      }
    }
  }
}
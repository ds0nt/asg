import path from 'path'
import fs from 'then-fs'

class Loader {
  constructor(folder) {
  	if (!fs.existsSync(path.join(folder, 'asg.yml')))
  		throw 'Not a valid ASG folder'

	this.tpl = (...p) => path.join(folder, 'templates', ...p)
	this.cfg = (...p) => path.join(folder, 'yaml', ...p)  	
  }

  async listTemplates() {
    return await fs.readdir(this.tpl())
  }

  async getTemplate(name) {
    return await fs.readFile(this.tpl(name), 'utf8')
  }

  async saveTemplate(name, src) {
    return await fs.writeFile(this.tpl(name), src)
  }

  async listConfigs() {
    return await fs.readdir(this.cfg())
  }

  async getConfig(name) {
    return await fs.readFile(this.cfg(name), 'utf8')
  }

  async saveConfig(name, src) {
    return await fs.writeFile(this.cfg(name), src)
  }
}

export default folder => (new Loader(folder))

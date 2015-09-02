import path from 'path'
import fs from 'then-fs'

let dir = process.cwd()
let templatePath = (...p) => path.join(dir, 'templates', ...p)
let configPath = (...p) => path.join(dir, 'config', ...p)

class FolderLoader {
  constructor() { }

  async listTemplates() {
    return await fs.readdir(templatePath())
  }

  async getTemplate(name) {
    return await fs.readFile(templatePath(name), 'utf8')
  }

  async saveTemplate(name, src) {
    return await fs.writeFile(templatePath(name), src)
  }

  async listConfigs() {
    return await fs.readdir(configPath())
  }

  async getConfig(name) {
    return await fs.readFile(configPath(name), 'utf8')
  }

  async saveConfig(name, src) {
    return await fs.writeFile(configPath(name), src)
  }
}

export default (new FolderLoader())

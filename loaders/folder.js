import path from 'path'
import fs from 'fs'

class FolderLoader {
  constructor(root) {
    this.root = path.join(root)
  }
  template(name) {
    let file = path.join(this.root, 'templates', name)
    let src = fs.readFileSync(file, 'utf8')
    console.log(`Loaded: ${file} (${src.length} chars)`)
    return src
  }
  config(name) {
    let file = path.join(this.root, 'config', name)
    let src = fs.readFileSync(file, 'utf8')
    console.log(`Loaded: ${file} (${src.length} chars)`)
    return src
  }
}

export default dir => new FolderLoader(dir)

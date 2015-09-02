import parseArgs from 'minimist'
import fs from 'fs'

import core from './core'

let usage = `
Usage:

./cli.js COMMAND [OPTIONS ...]

Commands:

  template <name> <path>            - Add named template from file
  skeleton-config <name> <template> - Generate the config skeleton
  view <name> <template> <config>   - Create a data driven view with template + config
  endpoint <uri> <view>
`

function failure(msg=false, help=true) {
  if (msg)
    console.error(msg);
  if (help)
    console.log(usage);
  process.exit(1);
}


let options = parseArgs(process.argv.slice(2))._
let command = options.pop();

switch (command) {
  case 'template':
    let [name, file] = options
    core.templates.create(name, fs.readfileSync(file))
    break;
  default:
    console.error(`The option '${command}' is invalid`);
    failure()
}

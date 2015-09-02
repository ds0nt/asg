#!/bin/babel-node

import parseArgs from 'minimist'
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
let resource = options.shift();
let command = options.shift();

resource = core[resource]
if (typeof resource === 'undefined')
  failure(`The resource '${resource}' is invalid`)

command = resource[command]
if (typeof command === 'undefined')
  failure(`The command '${command}' is invalid`)

async function run() {
  let result = await command(...options)
  console.log(result)
}
run();

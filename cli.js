#!/bin/babel-node

import parseArgs from 'minimist'
import core from './lib/core'

let usage = `
Usage:

./cli.js COMMAND [OPTIONS ...]

Commands:

  template save <name> <src>
  template get <name>
  template list

  config save <name> <src>
  config get <name>
  config list

  engine render <template> <config>

Future:
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

let [a, b, ...options] = parseArgs(process.argv.slice(2))._

let resource = core[a] || failure(`The resource '${a}' is invalid`)
let command = resource[b] || failure(`The command '${b}' is invalid`)

command(...options)
  .then(console.log, err => console.error(err.stack))
  .then(process.exit)

#!/bin/babel-node

import parseArgs from 'minimist'
import Core from './lib/core'
import miniapi from './lib/mini-api'



let [ target='.' ] = parseArgs(process.argv.slice(2))._

let core = Core({ target: target })


//
// api endpoints
//
let { get, post } = miniapi;

get `/template` (core.template.list)
get `/template/:name` (
	name => core.template.get(name)
)
post `/template/:name` (
	(name, {data}) => core.template.save(name, data)
)

get `/config` (core.config.list)
get `/config/:name` (
	name => core.config.get(name)
)
post `/config/:name` (
	(name, {data}) => core.config.save(name, data)
)

post `/render/:name` (
	(name, {config}) => core.engine.render(name, config)
)

get `/:name` (
	name => core.engine.serve(name)
)

miniapi.serve(__dirname + '/client/dist')
miniapi.listen(8080)

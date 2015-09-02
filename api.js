import { template, config, engine } from './lib/core'
import {get,post,listen} from './lib/mini-api'

get `/template` (template.list)
get `/template/:name` (name => template.get(name))
post `/template/:name` ((name, {data}) => template.save(name, data))

get `/config` (config.list)
get `/config/:name` (name => config.get(name) )
post `/config/:name` ((name, {data}) => config.save(name, data) )

post `/render/:name` ( (name, {config}) => engine.render(name, config) )

listen(8080)

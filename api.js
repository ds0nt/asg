
import { template, config, engine } from './core'
import { get, post, listen } from './lib/api'

get `/template` (() => template.list() )
get `/template/:name`  (name => template.get(name) )
post `/template/:name` ((name, {data}) => template.save(name, data) )

get `/config` (() => config.list() )
get `/config/:name`  (name => config.get(name) )
post `/config/:name` ((name, {data}) => config.save(name, data) )

get `/render` ((template, config) => engine.render(template, config) )

listen(8080)

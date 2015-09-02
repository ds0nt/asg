import koa from 'koa'

import cors from 'kcors'
import route from 'koa-route'
import json from 'koa-json'
import jsonbody from 'koa-json-body'

export default () => {
  let app = koa();
  app.use(cors())
  app.use(json())
  app.use(jsonbody())

  /**
   * application http[method] route factory interface with template strings
   */
  let routeVerb = method =>
    url => xfn =>
      app.use(route[method](url, function* () {
          if (typeof xfn.then === 'function') {
            this.body = yield xfn(this.request.body)
          } else {
            this.body = xfn(this.request.body)
          }
        }
      ))

  return {
    GET: routeVerb('get'),
    POST: routeVerb('post'),
    DELETE: routeVerb('delete'),
    PUT: routeVerb('put'),
    PATCH: routeVerb('patch'),
    listen: port => app.listen(port)
  }
}

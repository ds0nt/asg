#!/bin/babel-node

import koa from 'koa'
import serve from 'koa-static'

let app = koa()
app.use(serve('./dist'))
app.listen(8081)

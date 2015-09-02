#!/bin/babel-node

import axios from 'axios'

let host = process.argv[2] || 'http://127.0.0.1:8080'

let success = 0
let failed = 0

function testApi(result) {
  console.log('------ result ------')
  console.log('')
  console.dir(result.data || result )
  console.log('')
  console.log('')
  if (result.status == 200)
    success++
  else
    failed++
}

let tplname = 'test-template'
let ymlname = 'test-config'

async function tests() {
  testApi( await axios.get(`${host}/template`) )
  testApi( await axios.post(`${host}/template/${tplname}`, { data: "hello {{world}}" } ) )
  testApi( await axios.get(`${host}/template/${tplname}`) )

  testApi( await axios.get(`${host}/config`) )
  testApi( await axios.post(`${host}/config/${ymlname}`, { data: "world: a whole new world!!" } ) )
  testApi( await axios.get(`${host}/config/${ymlname}`) )

  testApi( await axios.post(`${host}/render/${tplname}`, { config: ymlname } ))

  return `Success ${success} - Failed ${failed}`
}

tests().then(console.log, console.error);

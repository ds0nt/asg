#!/bin/babel-node

import axios from 'axios'

let host = process.argv[2] || 'http://127.0.0.1:8080'

let success = 0
let failed = 0

function testApi(title, result) {
  console.log(`------ ${title} returns [${result.status}]`)
  console.log(`${JSON.stringify(result.data) }`)
  console.log('')
  console.log('')
  if (200 <= result.status && result.status < 300)
    success++
  else
    failed++
}

let tplname = 'test-template'
let ymlname = 'test-config'

async function tests() {
  // testApi('template list', await axios.get(`${host}/template`) )
  testApi('template create', await axios.post(`${host}/template/${tplname}`, { data: "hello {{world}}" } ) )
  testApi('template fetch', await axios.get(`${host}/template/${tplname}`) )

  // testApi('config list', await axios.get(`${host}/config`) )
  testApi('config create', await axios.post(`${host}/config/${ymlname}`, { data: "world: a whole new world!!" } ) )
  testApi('config fetch', await axios.get(`${host}/config/${ymlname}`) )

  testApi('render', await axios.post(`${host}/render/${tplname}`, { config: ymlname } ))

  return `Success ${success} - Failed ${failed}`
}

tests().then(console.log, console.error);

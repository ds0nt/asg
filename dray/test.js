#!/bin/babel-node

import dray from './api'
import job from './job.json'

async function test() {

  let created = await dray.spawn({data: job})  
  let jobs = await dray.all()
  
  for ( let job of jobs )  {
  	console.log(await dray.fetch(job.id))
  }
  // console.log(win)
}
test().then(console.dir, console.dir)
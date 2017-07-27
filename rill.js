'use strict'

// https://github.com/koajs/koa/pull/751
if (process.env.OVERRIDE_PROMISE) {
  global.Promise = require('bluebird')
}

const Rill = require('rill')

const app = new Rill()

// Number of middleware

let n = parseInt(process.env.MW || '1', 10)
console.log(`  ${n} middleware`)

while (n--) {
  app.use((ctx, next) => next())
}

const body = Buffer.from('Hello World')

app.use((ctx, next) => next().then(() => {
  ctx.res.body = body
}))

app.listen({ port: 7006 })

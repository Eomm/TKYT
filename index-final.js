'use strict'

const Fastify = require('fastify')

const fastifyMongo = require('@fastify/mongodb')
// const fastifyCors = require('@fastify/cors')
const fastifyOverview = require('fastify-overview')
const fastifyOverviewUi = require('fastify-overview-ui')

async function run () {
  const app = Fastify({ logger: !true })

  await app.register(fastifyOverview, { hideEmpty: true })
  await app.register(fastifyOverviewUi)

  // app.register(fastifyCors, {
  //   origin: '*',
  // })

  app.register(function plugin (app, opts, next) {
    app.register(fastifyMongo, {
      url: 'mongodb://localhost:27011'
    })
    next()
  })

  app.register(function plugin (app, opts, next) {
    app.register(fastifyMongo, {
      url: 'mongodb://localhost:27012'
    })
    next()
  })

  app.register(function plugin (app, opts, next) {
    app.register(fastifyMongo, {
      url: 'mongodb://localhost:27013'
    })
    next()
  })

  app.get('/', async (request, reply) => {
    return { hello: 'world' }
  })

  await app.listen({ port: 8080 })
}

run()

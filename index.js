'use strict'

const Fastify = require('fastify')
const fastifyMongo = require('@fastify/mongodb')

const fastifyOverview = require('fastify-overview')
const fastifyOverviewUi = require('fastify-overview-ui')

// const fp = require('fastify-plugin')

async function run () {
  const app = Fastify({ logger: true, exposeHeadRoutes: false })

  await app.register(fastifyOverview, { hideEmpty: true })
  await app.register(fastifyOverviewUi)

  app.decorate('config', function () {
  })

  app.register(function pluginOne (app, opts, next) {
    next()
  })
  app.register(function pluginTwo (app, opts, next) {
    // 2

    app.decorate('utility', function () {
    })

    app.register(function pluginFour (app, opts, next) {
      // 4

      app.get('/hello', () => { })

      app.register(function pluginFive (app, opts, next) {
        app.decorate('utilityChild', function () {
        })
        next()
      })
      app.register(function pluginSix (app, opts, next) {
        app.register(fastifyMongo, {
          url: 'mongodb://localhost:27011fix'
        })
        next()
      })
      next()
    })
    next()
  })
  app.register(function pluginThree (app, opts, next) {
    next()
  })

  await app.listen({ port: 8080 })
}

run()

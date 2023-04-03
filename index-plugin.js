'use strict'

const fastifyOverview = require('fastify-overview')
const fastifyOverviewUi = require('fastify-overview-ui')

const fastifyCors = require('@fastify/cors')

module.exports = async function plugin (app, opts) {
  await app.register(fastifyOverview, { hideEmpty: true, addSource: true })
  await app.register(fastifyOverviewUi)

  app.register(fastifyCors, {
    origin: '*'
  })

  app.head('/nice', () => { })

  app.get('/hello', () => {
    return 'world'
  })
}

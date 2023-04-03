'use strict'

const Fastify = require('fastify')

async function run () {
  const app = Fastify({ logger: !true, exposeHeadRoutes: false })

  await app.listen({ port: 8080 })
}

run()

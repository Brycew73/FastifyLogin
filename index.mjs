import 'dotenv/config';

import Fastify from 'fastify';

async function buildServer() {
  const server = Fastify({ logger: true });

  await server.register(import('fastify-auth0-verify'), {
    domain: process.env.AUTH0_DOMAIN,
    secret: process.env.AUTH0_CLIENT_SECRET
  });

  server.get('/protected',
    { preValidation: server.authenticate },
    (request, reply) => {
        return { route: 'Protected route' };
  });

  await server.listen({ port: 3000 });

  return server;
}

buildServer();
import path from 'path';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fastifyStatic from '@fastify/static';

const staticPath = path.join(__dirname, '..', 'out');

interface FastifyRouterOptions {
  prefix?: string;
}

export const fastifyRouter: FastifyPluginAsync<FastifyRouterOptions> = async (fastify: FastifyInstance, opts) => {
  fastify.register(fastifyStatic, {
    root: staticPath,
    prefix: opts.prefix || '/',
  });

  fastify.setNotFoundHandler((request, reply) => {
    if (request.raw.method === 'GET') {
      reply.type('text/html').sendFile('index.html');
    } else {
      reply.status(404).send({ error: 'Not Found' });
    }
  });
};

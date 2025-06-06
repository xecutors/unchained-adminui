import path from 'path';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fastifyStatic from '@fastify/static';

const staticPath = path.join(__dirname, 'out'); // after build, dist/out/index.html

const fastifyRouter: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(fastifyStatic, {
    root: staticPath,
    prefix: '/', // configurable at register time
  });

  fastify.setNotFoundHandler((request, reply) => {
    if (request.raw.method === 'GET') {
      reply.type('text/html').sendFile('index.html');
    } else {
      reply.status(404).send({ error: 'Not Found' });
    }
  });
};


export default fastifyRouter;
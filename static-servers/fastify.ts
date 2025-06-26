import path from 'path';
import {
  FastifyInstance,
  FastifyPluginAsync,
  RouteHandlerMethod,
  FastifyRequest,
} from 'fastify';
import fastifyStatic from '@fastify/static';
import { errorHandler } from './utils';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  experimental_createMCPClient as createMCPClient,
  streamText,
} from 'ai';
type StreamTextParams = Parameters<typeof streamText>[0];

export interface ChatConfiguration extends StreamTextParams {
  mcpEndpoint: string;
}

const staticPath = path.join(__dirname, '..', 'out');

interface FastifyRouterOptions {
  prefix?: string;
}

export const fastifyRouter: FastifyPluginAsync<FastifyRouterOptions> = async (
  fastify: FastifyInstance,
  opts,
) => {
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

const setupMCPChatHandler = (chatConfiguration: ChatConfiguration) => {
  let client: any;
  if (!chatConfiguration?.model) {
    throw new Error('Model is required');
  }

  const { tools = {}, mcpEndpoint, ...restChatConfig } = chatConfiguration;

  const mcpChatHandler: RouteHandlerMethod = async (
    req: FastifyRequest,
    res,
  ) => {
    try {
      if (req.method === 'OPTIONS') return res.send();
      const { messages } = req.body as any;
      client = await createMCPClient({
        transport: new StreamableHTTPClientTransport(new URL(mcpEndpoint)),
      });

      const defaultUnchainedTools = await client.tools();

      const result = streamText({
        ...restChatConfig,
        messages,
        tools: { ...defaultUnchainedTools, ...tools },
        onFinish: async () => {
          await client?.close();
        },
      });

      res.header('X-Vercel-AI-Data-Stream', 'v1');
      res.header('Content-Type', 'text/plain; charset=utf-8');
      return res.send(
        result.toDataStream({
          getErrorMessage: errorHandler,
        }),
      );
    } catch (e: any) {
      res.status(503);
      return res.send(
        JSON.stringify({ name: e.name, code: e.code, message: e.message }),
      );
    }
  };
  return mcpChatHandler;
};

export const connectChat = (
  app: FastifyInstance,
  chatConfiguration: ChatConfiguration,
) => {
  const handler = setupMCPChatHandler(chatConfiguration);

  app.route({
    url: '/chat',
    method: ['POST', 'OPTIONS'],
    handler,
  });
};

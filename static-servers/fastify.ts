import path from 'path';
import {
  FastifyInstance,
  FastifyPluginAsync,
  RouteHandlerMethod,
  FastifyRequest,
} from 'fastify';
import fastifyStatic from '@fastify/static';
import { categorizeTools, ChatConfiguration, errorHandler } from './utils';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  experimental_createMCPClient as createMCPClient,
  ImageModel,
  streamText,
} from 'ai';
import generateImageHandler from './generateImageHandler';
import defaultSystemPrompt from './defaultSystemPrompt';

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

  const {
    tools = {},
    unchainedMCPUrl = `${process.env.ROOT_URL}/mcp`,
    imageGenerationTool,
    ...restChatConfig
  } = chatConfiguration;

  const system = chatConfiguration.system ?? defaultSystemPrompt;

  const mcpChatHandler: RouteHandlerMethod = async (
    req: FastifyRequest,
    res,
  ) => {
    try {
      if (req.method === 'OPTIONS') return res.send();

      client = await createMCPClient({
        transport: new StreamableHTTPClientTransport(new URL(unchainedMCPUrl), {
          requestInit: {
            headers: {
              Cookie: req.headers.cookie || '',
            },
          },
        }),
      });

      const defaultUnchainedTools = await client.tools();
      const customTools: Record<string, any> = { ...tools };

      if (imageGenerationTool) {
        customTools.generateImage =
          generateImageHandler(req)(imageGenerationTool);
      }

      if (req.method === 'GET') {
        const mcpTools = {
          ...defaultUnchainedTools,
          ...customTools,
        };
        const tools = Object.entries(mcpTools).map(([name, tool]: any) => ({
          name,
          description: tool.description || '',
          parameters: tool.parameters || {},
          category: categorizeTools(name),
        }));
        return res.status(200).send({
          tools,
        });
      }

      const { messages } = req.body as any;
      const result = streamText({
        ...restChatConfig,
        messages,
        system,
        tools: { ...defaultUnchainedTools, ...customTools },
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

  app.route({
    url: '/chat/tools',
    method: ['GET', 'OPTIONS'],
    handler,
  });
};

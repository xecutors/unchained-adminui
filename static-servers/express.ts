import express from 'express';
import type { Express, Request, RequestHandler, Response } from 'express';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import path from 'node:path';
import {
  experimental_createMCPClient as createMCPClient,
  streamText,
} from 'ai';
import { categorizeTools, ChatConfiguration, errorHandler } from './utils';
import generateImageHandler from './generateImageHandler';
import defaultSystemPrompt from './defaultSystemPrompt';

export const expressRouter = express.Router();
const staticPath = path.join(__dirname, '..', 'out');

expressRouter.use(express.static(staticPath));

expressRouter.get(/(.*)/, (_, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

const setupMCPChatHandler = (
  chatConfiguration: ChatConfiguration,
): RequestHandler => {
  if (!chatConfiguration || !chatConfiguration.model) {
    throw new Error('Model is required');
  }

  const {
    tools = {},
    unchainedMCPUrl = `${process.env.ROOT_URL}/mcp`,
    model,
    imageGenerationTool,
    ...restChatConfig
  } = chatConfiguration;

  const system = chatConfiguration.system ?? defaultSystemPrompt;

  const mcpChatHandler: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    if (req.method !== 'POST' && req.method !== 'GET') {
      res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
      return;
    }

    let client: any;
    try {
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
        res.status(200).json({
          tools,
        });
        return;
      }
      const { messages } = req.body;
      const result = streamText({
        ...restChatConfig,
        system,
        model,
        messages,
        tools: {
          ...defaultUnchainedTools,
          ...customTools,
        },
        onFinish: async () => {
          await client?.close();
        },
      });

      result.pipeDataStreamToResponse(res, {
        getErrorMessage: errorHandler,
      });
    } catch (err) {
      await client?.close();
      res.status(500).json({ error: errorHandler(err) });
    }
  };

  return mcpChatHandler;
};

export const connectChat = (
  app: Express,
  chatConfiguration: ChatConfiguration,
) => {
  const handler = setupMCPChatHandler(chatConfiguration);
  if (!handler) {
    throw new Error('Invalid chat configuration: model is required.');
  }
  app.post('/chat', express.json({ limit: '10mb' }), handler);
  app.options('/chat', handler);
  app.get('/chat/tools', handler);
};

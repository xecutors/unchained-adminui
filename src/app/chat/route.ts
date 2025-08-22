import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  experimental_createMCPClient as createMCPClient,
  MCPTransport,
  convertToModelMessages,
  streamText,
  ToolSet,
  stepCountIs,
} from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import generateImageHandler from '../../../static-servers/generateImageHandler';
import { defaultSystemPrompt, errorHandler } from '../../../static-servers';
import { createOpenAI } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const unchainedMCPUrl = process.env.MCP_API_URL || 'http://localhost:4010/mcp';

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const httpTransport = new StreamableHTTPClientTransport(
    new URL(unchainedMCPUrl),
    {
      requestInit: {
        headers: {
          Cookie: req.headers.get('cookie') || '',
        },
      },
    },
  );
  const client = await createMCPClient({
    transport: httpTransport as MCPTransport,
  });
  const defaultUnchainedTools = await client.tools();
  const tools: ToolSet = defaultUnchainedTools;
  if (
    process.env.NEXT_PUBLIC_TEMP_FILE_UPLOAD_URL &&
    process.env.OPENAI_API_KEY
  ) {
    tools.generateImage = generateImageHandler(req)({
      model: openai.image('dall-e-3'),
      uploadUrl: process.env.NEXT_PUBLIC_TEMP_FILE_UPLOAD_URL,
    });
  }

  const result = streamText({
    system: defaultSystemPrompt,
    model: anthropic.chat('claude-sonnet-4-20250514'),
    messages: convertToModelMessages(messages, {
      tools,
    }),
    stopWhen: stepCountIs(3),
    tools,
    onError: async (e) => {
      console.log(e);
    },
    onFinish: async () => {
      await client?.close();
    },
  });

  return result.toUIMessageStreamResponse({
    onError: errorHandler,
  });
}

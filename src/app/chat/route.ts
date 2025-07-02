import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  experimental_createMCPClient as createMCPClient,
  streamText,
} from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import generateImageHandler from '../../../static-servers/generateImageHandler';
import { errorHandler } from '../../../static-servers';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const unchainedMCPUrl = process.env.MCP_API_URL || 'http://localhost:4010/mcp';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const client = await createMCPClient({
    transport: new StreamableHTTPClientTransport(new URL(unchainedMCPUrl), {
      requestInit: {
        headers: {
          Cookie: req.headers.get('cookie') || '',
        },
      },
    }),
  });
  const mcpTools = await client.tools();
  const result = streamText({
    maxTokens: 8000,
    maxSteps: 1,
    system:
      'do not include the data in your summary, just write a summary about it in one short paragraph and never list all the fields of a result, just summarize paragraph about your findings, if necessary',
    model: anthropic('claude-4-sonnet-20250514'),
    messages,
    tools: {
      ...mcpTools,
      generateImage: generateImageHandler(req)({
        model: openai.image('dall-e-3'),
        uploadUrl: process.env.NEXT_PUBLIC_TEMP_FILE_UPLOAD_URL,
      }),
    },
    onError: async (e) => {
      console.log(e);
    },
    onFinish: async () => {
      await client?.close();
    },
  });

  return result.toDataStreamResponse({
    getErrorMessage: errorHandler,
  });
}

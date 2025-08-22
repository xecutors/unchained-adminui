import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  experimental_createMCPClient as createMCPClient,
  MCPTransport,
  convertToModelMessages,
  streamText,
  ToolSet,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import generateImageHandler from '../../../static-servers/generateImageHandler';
import { errorHandler } from '../../../static-servers';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const unchainedMCPUrl = process.env.MCP_API_URL || 'http://localhost:4010/mcp';

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
  if (process.env.NEXT_PUBLIC_TEMP_FILE_UPLOAD_URL) {
    tools.generateImage = generateImageHandler(req)({
      model: openai.image('dall-e-3'),
      uploadUrl: process.env.NEXT_PUBLIC_TEMP_FILE_UPLOAD_URL,
    });
  }

  const result = streamText({
    system:
      'do not include the data in your summary, just write a summary about it in one short paragraph and never list all the fields of a result, just summarize paragraph about your findings, if necessary',
    model: openai.chat('gpt-4.1-mini'),
    messages: convertToModelMessages(messages, {
      tools,
    }),
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

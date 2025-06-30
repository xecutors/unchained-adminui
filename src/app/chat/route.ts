import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  experimental_createMCPClient as createMCPClient,
  experimental_generateImage,
  streamText,
  tool,
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const mcpEndpoint = process.env.MCP_API_URL || 'http://localhost:4010/mcp';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const client = await createMCPClient({
    transport: new StreamableHTTPClientTransport(new URL(mcpEndpoint), {
      requestInit: {
        headers: {
          Cookie: req.headers.get('cookie') || '',
        },
      },
    }),
  });
  const mcpTools = await client.tools();

  const result = streamText({
    system:
      'do not include the data in your summary, just write a summary about it in one short paragraph and never list all the fields of a result, just summarize paragraph about your findings, if necessary',
    model: openai('gpt-4o'),
    providerOptions: {
      openai: { responseModalities: ['TEXT', 'IMAGE'] },
    },

    messages,
    tools: {
      ...mcpTools,
      generateImage: tool({
        description: 'Generate an image',
        parameters: z.object({
          prompt: z.string().describe('The prompt to generate the image from'),
        }),
        execute: async ({ prompt }) => {
          const { image } = await experimental_generateImage({
            model: openai.image('dall-e-3'),
            prompt,
          });
          // in production, save this image to blob storage and return a URL
          // TODO: Generate an URL here
          return { image: image.base64, prompt };
        },
      }),
    },
    onFinish: async () => {
      await client?.close();
    },
  });

  return result.toDataStreamResponse();
}

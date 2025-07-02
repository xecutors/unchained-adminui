import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { experimental_createMCPClient as createMCPClient } from 'ai';
export const dynamic = 'force-static';
const unchainedMCPUrl = process.env.MCP_API_URL || 'http://localhost:4010/mcp';

// Simple in-memory cache
let toolsCache: any = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(req: Request) {
  try {
    // Check cache
    const now = Date.now();
    if (toolsCache && now - cacheTimestamp < CACHE_DURATION) {
      return Response.json({
        tools: toolsCache,
        cached: true,
        timestamp: cacheTimestamp,
      });
    }

    // Fetch fresh tools from MCP
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

    // Transform tools to a more frontend-friendly format
    const tools = Object.entries(mcpTools).map(([name, tool]) => ({
      name,
      description: tool.description || '',
      parameters: tool.parameters || {},
      // Add category based on tool name patterns
      category: categorize(name),
    }));

    // Update cache
    toolsCache = tools;
    cacheTimestamp = now;

    await client.close();

    return Response.json({
      tools,
      cached: false,
      timestamp: cacheTimestamp,
    });
  } catch (error) {
    console.error('Error fetching tools:', error);

    // Return cached data if available, even if expired
    if (toolsCache) {
      return Response.json({
        tools: toolsCache,
        cached: true,
        timestamp: cacheTimestamp,
        error: 'Failed to fetch fresh data, using cache',
      });
    }

    return Response.json(
      {
        error: 'Failed to fetch tools',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function categorize(toolName: string): string {
  const name = toolName.toLowerCase();

  if (name.includes('product')) return 'Product Management';
  if (name.includes('order')) return 'Order Management';
  if (name.includes('customer') || name.includes('user'))
    return 'Customer Management';
  if (name.includes('shop') || name.includes('settings'))
    return 'Shop Configuration';
  if (name.includes('assortment')) return 'Assortments';
  if (name.includes('filter')) return 'Filters';
  if (name.includes('image') || name.includes('generate'))
    return 'Media & Content';

  return 'Other Tools';
}

import { useState, useEffect } from 'react';

export interface Tool {
  name: string;
  description: string;
  parameters: any;
  category: string;
}

export interface ToolsResponse {
  tools: Tool[];
  cached: boolean;
  timestamp: number;
  error?: string;
}

interface UseAvailableToolsReturn {
  tools: Tool[];
  groupedTools: Record<string, Tool[]>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  lastUpdated: Date | null;
}

export const useAvailableTools = (): UseAvailableToolsReturn => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchTools = async () => {
    setLoading(true);
    setError(null);
    const normalizedToolsUrl = process.env.NEXT_PUBLIC_CHAT_URL
      ? `${process.env.NEXT_PUBLIC_CHAT_URL}/tools`
      : '/chat/tools';
    try {
      const response = await fetch(normalizedToolsUrl, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tools: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(
          'Tools endpoint returned non-JSON response (likely HTML error page)',
        );
      }

      let data: ToolsResponse;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid JSON response from tools endpoint');
      }

      if (data.error && !data.tools) {
        throw new Error(data.error);
      }

      setTools(data.tools || []);
      setLastUpdated(new Date(data.timestamp));

      if (data.error) {
        // We have cached data but also an error
        console.warn('Using cached tools data:', data.error);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch available tools';

      // Check if this is a development environment endpoint issue
      const isEndpointNotFound =
        errorMessage.includes('non-JSON response') ||
        errorMessage.includes('404') ||
        errorMessage.includes('Internal Server Error') ||
        errorMessage.includes('Failed to fetch') ||
        errorMessage.includes('TypeError: Failed to fetch') ||
        err instanceof TypeError;

      if (process.env.NODE_ENV === 'development' && isEndpointNotFound) {
        console.warn(
          'Chat tools endpoint not available, using default tools. This is expected if the backend chat service is not running.',
        );
        setError(null); // Don't show error in development for endpoint issues
      } else {
        console.error('Error fetching tools:', err);
        setError(errorMessage);
      }

      // Set default tools as fallback
      setTools(getDefaultTools());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  // Group tools by category
  const groupedTools = tools.reduce<Record<string, Tool[]>>((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return {
    tools,
    groupedTools,
    loading,
    error,
    refetch: fetchTools,
    lastUpdated,
  };
};

// Fallback tools when API is unavailable
function getDefaultTools(): Tool[] {
  return [
    {
      name: 'list_products',
      description: 'List and search products in your catalog',
      parameters: {},
      category: 'Product Management',
    },
    {
      name: 'get_product',
      description: 'Get detailed information about a specific product',
      parameters: {},
      category: 'Product Management',
    },
    {
      name: 'create_product',
      description: 'Create a new product in your catalog',
      parameters: {},
      category: 'Product Management',
    },
    {
      name: 'publish_product',
      description: 'Publish a draft product to make it available',
      parameters: {},
      category: 'Product Management',
    },
    {
      name: 'list_assortments',
      description: 'List and search assortments (categories) in your catalog',
      parameters: {},
      category: 'Assortment Management',
    },
    {
      name: 'get_assortment',
      description: 'Get detailed information about a specific assortment',
      parameters: {},
      category: 'Assortment Management',
    },
    {
      name: 'shop_info',
      description: 'Get information about your shop configuration',
      parameters: {},
      category: 'Shop Configuration',
    },
    {
      name: 'generateImage',
      description: 'Generate images using AI',
      parameters: {},
      category: 'Media & Content',
    },
  ];
}

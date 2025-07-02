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

    try {
      const response = await fetch('/tools', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tools: ${response.statusText}`);
      }

      const data: ToolsResponse = await response.json();
      
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
      console.error('Error fetching tools:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch available tools');
      
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
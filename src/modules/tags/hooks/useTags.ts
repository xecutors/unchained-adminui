import { useState, useEffect, useMemo } from 'react';
import useProducts from '../../product/hooks/useProducts';
import useAssortments from '../../assortment/hooks/useAssortments';

interface TagData {
  name: string;
  usage: {
    products: number;
    assortments: number;
    total: number;
  };
  lastUsed?: Date;
}

interface UseTagsOptions {
  queryString?: string;
  limit?: number;
  offset?: number;
  sort?: Record<string, 'ASC' | 'DESC'>;
}

const useTags = (options: UseTagsOptions = {}) => {
  const { queryString = '', limit = 50, offset = 0, sort = {} } = options;
  const [tags, setTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products with tags using existing hook
  const { products, loading: productsLoading } = useProducts({
    limit: 1000, // Get all products for now to aggregate tags
    offset: 0,
    includeDrafts: true,
  });

  // Fetch assortments with tags using existing hook
  const { assortments, loading: assortmentsLoading } = useAssortments({
    limit: 1000, // Get all assortments for now to aggregate tags
    offset: 0,
    includeInactive: true,
  });

  // Process and aggregate tags
  const aggregatedTags = useMemo(() => {
    console.log('Processing tags...', {
      products: products?.length,
      assortments: assortments?.length,
    });

    if (!products && !assortments) {
      console.log('Missing data:', {
        products: !!products,
        assortments: !!assortments,
      });
      return [];
    }

    // Load custom tags from localStorage
    const customTags = JSON.parse(localStorage.getItem('customTags') || '[]');

    // Temporary: Add some sample tags for testing
    if (
      (!products || products.length === 0) &&
      (!assortments || assortments.length === 0)
    ) {
      const sampleTags = [
        {
          name: 'electronics',
          usage: { products: 5, assortments: 2, total: 7 },
        },
        {
          name: 'clothing',
          usage: { products: 3, assortments: 1, total: 4 },
        },
        {
          name: 'outdoor',
          usage: { products: 2, assortments: 0, total: 2 },
        },
      ];

      // Combine sample tags with custom tags
      const allTags = [...sampleTags];
      customTags.forEach((customTag: any) => {
        if (!allTags.find((tag) => tag.name === customTag.name)) {
          allTags.push({
            name: customTag.name,
            usage: customTag.usage || { products: 0, assortments: 0, total: 0 },
          });
        }
      });

      return allTags;
    }

    const tagMap = new Map<string, TagData>();

    // Process product tags
    products.forEach((product) => {
      if (product.tags?.length > 0) {
        console.log('Product with tags:', product._id, product.tags);
      }
      product.tags?.forEach((tag) => {
        if (tag) {
          const existing = tagMap.get(tag);
          if (existing) {
            existing.usage.products++;
            existing.usage.total++;
          } else {
            tagMap.set(tag, {
              name: tag,
              usage: {
                products: 1,
                assortments: 0,
                total: 1,
              },
            });
          }
        }
      });
    });

    // Process assortment tags
    assortments.forEach((assortment) => {
      if (assortment.tags?.length > 0) {
        console.log('Assortment with tags:', assortment._id, assortment.tags);
      }
      assortment.tags?.forEach((tag) => {
        if (tag) {
          const existing = tagMap.get(tag);
          if (existing) {
            existing.usage.assortments++;
            existing.usage.total++;
          } else {
            tagMap.set(tag, {
              name: tag,
              usage: {
                products: 0,
                assortments: 1,
                total: 1,
              },
            });
          }
        }
      });
    });

    const result = Array.from(tagMap.values());
    console.log('Final tags result:', result);
    return result;
  }, [products, assortments]);

  // Filter and sort tags
  const filteredAndSortedTags = useMemo(() => {
    let filtered = aggregatedTags;

    // Apply search filter
    if (queryString) {
      const searchLower = queryString.toLowerCase();
      filtered = filtered.filter((tag) =>
        tag.name.toLowerCase().includes(searchLower),
      );
    }

    // Apply sorting
    const sortKey = Object.keys(sort)[0];
    const sortDirection = sortKey ? sort[sortKey] : 'ASC';

    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case 'usage':
          comparison = a.usage.total - b.usage.total;
          break;
        case 'name':
        default:
          comparison = a.name.localeCompare(b.name);
          break;
      }

      return sortDirection === 'DESC' ? -comparison : comparison;
    });

    return filtered;
  }, [aggregatedTags, queryString, sort]);

  // Apply pagination
  const paginatedTags = useMemo(() => {
    const startIndex = offset;
    const endIndex = offset + limit;
    return filteredAndSortedTags.slice(startIndex, endIndex);
  }, [filteredAndSortedTags, offset, limit]);

  useEffect(() => {
    setLoading(productsLoading || assortmentsLoading);
    setTags(paginatedTags);
  }, [productsLoading, assortmentsLoading, paginatedTags]);

  const hasMore = offset + limit < filteredAndSortedTags.length;
  const tagsCount = filteredAndSortedTags.length;

  const loadMore = () => {
    // This would typically update the offset state
    // For now, we'll return early since we're doing client-side pagination
    console.log('Load more tags...');
  };

  return {
    tags,
    tagsCount,
    loading,
    loadMore,
    hasMore,
  };
};

export default useTags;

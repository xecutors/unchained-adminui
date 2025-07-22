// hooks/useProductImport.ts
import useApp from '../../common/hooks/useApp';
import { CSVRow } from '../../common/utils/csvUtils';
import useCreateProduct from './useCreateProduct';
import useUpdateProduct from './useUpdateProduct';
import useUpdateProductTexts from './useUpdateProductTexts';

export const productMapper = (row: CSVRow) => ({
  _id: row['ID'] || undefined,
  locale: row['Locale'],
  title: row['Title'],
  slug: row['Slug'],
  status: row['Status'],
  type: row['Type'] || 'SimpleProduct',
  tags: row['Tags'] ? row['Tags'].split(';') : [],
  sequence: row['Sequence'] ? parseInt(row['Sequence'], 10) : 0,
  description: row['Description'],
  vendor: row['Vendor'],
  brand: row['Brand'],
  labels: row['Labels'] ? row['Labels'].split(';') : [],
});

export const validateProduct = (product: any): string[] => {
  const errors: string[] = [];
  if (!product.title) errors.push('Title is required');
  if (!product.type) errors.push('Type is required');
  if (
    ![
      'SimpleProduct',
      'ConfigurableProduct',
      'PlanProduct',
      'BundleProduct',
    ].includes(product.type)
  ) {
    errors.push(`Invalid product type: ${product.type}`);
  }
  if (!['DRAFT', 'ACTIVE', 'DELETED'].includes(product.status)) {
    errors.push(`Invalid status: ${product.status}`);
  }
  return errors;
};

const useProductImport = () => {
  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();
  const { updateProductTexts } = useUpdateProductTexts();
  const { selectedLocale } = useApp();

  const importProduct = async (product: any) => {
    const isUpdate = product?._id || product?.slug;
    const normalizedLocale = product?.locale || selectedLocale;
    try {
      if (isUpdate) {
        const { errors } = await updateProduct({
          productId: product._id,
          product: {
            sequence: product.sequence,
            tags: product.tags,
          },
        });

        if (errors?.length) {
          throw new Error(
            errors?.[0]?.extensions?.code || errors?.[0]?.message,
          );
        }
        await updateProductTexts({
          productId: product._id,
          texts: [
            {
              locale: normalizedLocale,
              title: product.title,
              slug: product.slug,
              description: product.description,
              vendor: product.vendor,
              brand: product.brand,
              labels: product.labels,
            },
          ],
        });
      } else {
        await createProduct({
          product: {
            type: product.type,
            tags: product.tags,
          },
          texts: [
            {
              locale: normalizedLocale,
              title: product.title,
              slug:
                product.slug ||
                product.title.toLowerCase().replace(/\s+/g, '-'),
              description: product.description,
              vendor: product.vendor,
              brand: product.brand,
              labels: product.labels,
            },
          ],
        });
      }
    } catch (e) {
      if (e.message === 'ProductNotFoundError') {
        await createProduct({
          product: {
            type: product.type,
            tags: product.tags,
          },
          texts: [
            {
              locale: normalizedLocale,
              title: product.title,
              slug:
                product.slug ||
                product.title.toLowerCase().replace(/\s+/g, '-'),
              description: product.description,
              vendor: product.vendor,
              brand: product.brand,
              labels: product.labels,
            },
          ],
        });
        return;
      }
    }
  };

  return { importProduct };
};

export default useProductImport;

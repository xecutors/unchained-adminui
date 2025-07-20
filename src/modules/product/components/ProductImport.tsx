import React, { useState, useRef } from 'react';
import { useIntl } from 'react-intl';
import Button from '../../common/components/Button';
import useAuth from '../../Auth/useAuth';
import useModal from '../../modal/hooks/useModal';
import useCreateProduct from '../hooks/useCreateProduct';
import useUpdateProduct from '../hooks/useUpdateProduct';
import useUpdateProductTexts from '../hooks/useUpdateProductTexts';

interface ImportResult {
  success: number;
  failed: number;
  errors: string[];
}

const ProductImport = () => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const { setModal } = useModal();
  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();
  const { updateProductTexts } = useUpdateProductTexts();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  const parseCSV = (csvContent: string): any[] => {
    const lines = csvContent.split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map((h) => h.replace(/"/g, '').trim());
    const rows = lines.slice(1).filter((line) => line.trim());

    return rows.map((row) => {
      const values = row.split(',').map((v) => v.replace(/"/g, '').trim());
      const product: any = {};

      headers.forEach((header, index) => {
        const value = values[index] || '';

        switch (header) {
          case 'ID':
            product._id = value;
            break;
          case 'Title':
            product.title = value;
            break;
          case 'Slug':
            product.slug = value;
            break;
          case 'Status':
            product.status = value;
            break;
          case 'Type':
            product.type = value || 'SimpleProduct';
            break;
          case 'Tags':
            product.tags = value ? value.split(';') : [];
            break;
          case 'Sequence':
            product.sequence = value ? parseInt(value, 10) : 0;
            break;
          case 'Description':
            product.description = value;
            break;
          case 'Vendor':
            product.vendor = value;
            break;
          case 'Brand':
            product.brand = value;
            break;
          case 'Labels':
            product.labels = value ? value.split(';') : [];
            break;
        }
      });

      return product;
    });
  };

  const validateProduct = (product: any): string[] => {
    const errors: string[] = [];

    if (!product.title) {
      errors.push('Title is required');
    }

    if (!product.type) {
      errors.push('Type is required');
    }

    if (
      ![
        'SimpleProduct',
        'ConfigurableProduct',
        'PlanProduct',
        'BundleProduct',
      ].includes(product.type)
    ) {
      errors.push('Invalid product type');
    }

    if (!['DRAFT', 'ACTIVE', 'DELETED'].includes(product.status)) {
      errors.push('Invalid status');
    }

    return errors;
  };

  const importProduct = async (
    productData: any,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const validationErrors = validateProduct(productData);
      if (validationErrors.length > 0) {
        return { success: false, error: validationErrors.join(', ') };
      }

      // Check if product exists (by ID or slug)
      const isUpdate = productData._id || productData.slug;

      if (isUpdate) {
        // Update existing product
        if (productData._id) {
          await updateProduct({
            productId: productData._id,
            product: {
              sequence: productData.sequence,
              tags: productData.tags,
            },
          });

          // Update product texts
          await updateProductTexts({
            productId: productData._id,
            texts: [
              {
                locale: 'en', // Default locale
                title: productData.title,
                slug: productData.slug,
                description: productData.description,
                vendor: productData.vendor,
                brand: productData.brand,
                labels: productData.labels,
              },
            ],
          });
        }
      } else {
        // Create new product
        await createProduct({
          product: {
            type: productData.type,
            tags: productData.tags,
          },
          texts: [
            {
              locale: 'en', // Default locale
              title: productData.title,
              slug:
                productData.slug ||
                productData.title.toLowerCase().replace(/\s+/g, '-'),
              description: productData.description,
              vendor: productData.vendor,
              brand: productData.brand,
              labels: productData.labels,
            },
          ],
        });
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'Unknown error' };
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setModal('Please select a CSV file');
      return;
    }

    setIsImporting(true);
    const result: ImportResult = { success: 0, failed: 0, errors: [] };

    try {
      const csvContent = await file.text();
      const products = parseCSV(csvContent);

      for (const product of products) {
        const importResult = await importProduct(product);

        if (importResult.success) {
          result.success++;
        } else {
          result.failed++;
          result.errors.push(
            `Row ${result.success + result.failed}: ${importResult.error}`,
          );
        }
      }

      // Show import results
      setModal(
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            {formatMessage({
              id: 'import_results',
              defaultMessage: 'Import Results',
            })}
          </h3>
          <div className="space-y-2">
            <p className="text-green-600">
              {formatMessage(
                {
                  id: 'products_imported',
                  defaultMessage: '{count} products imported successfully',
                },
                { count: result.success },
              )}
            </p>
            {result.failed > 0 && (
              <div>
                <p className="text-red-600">
                  {formatMessage(
                    {
                      id: 'products_failed',
                      defaultMessage: '{count} products failed to import',
                    },
                    { count: result.failed },
                  )}
                </p>
                <div className="mt-2 max-h-40 overflow-y-auto">
                  {result.errors.slice(0, 10).map((error, index) => (
                    <p key={index} className="text-sm text-red-500">
                      {error}
                    </p>
                  ))}
                  {result.errors.length > 10 && (
                    <p className="text-sm text-gray-500">
                      ... and {result.errors.length - 10} more errors
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={() => setModal('')}
            className="mt-4"
            text={formatMessage({ id: 'close', defaultMessage: 'Close' })}
          />
        </div>,
      );
    } catch (error) {
      setModal(`Import failed: ${error.message}`);
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  if (!hasRole('addProduct')) return null;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button
        onClick={handleImportClick}
        disabled={isImporting}
        variant="secondary"
        text={
          isImporting
            ? formatMessage({ id: 'importing', defaultMessage: 'Importing...' })
            : formatMessage({ id: 'import', defaultMessage: 'Import' })
        }
      />
    </>
  );
};

export default ProductImport;

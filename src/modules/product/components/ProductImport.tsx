import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import Button from '../../common/components/Button';
import useAuth from '../../Auth/useAuth';
import useModal from '../../modal/hooks/useModal';
import { useCSVImport } from '../../common/hooks/useCSVImport';
import useProductImport, {
  productMapper,
  validateProduct,
} from '../hooks/useProductImport';

import parseCSV from 'papaparse';

const ProductImport = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const { setModal } = useModal();
  const { importProduct } = useProductImport();

  const { isImporting, importItems } = useCSVImport({
    validate: validateProduct,
    process: importProduct,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setModal('Please select a valid CSV file.');
      return;
    }

    const content = await file.text();

    const productsCSV = parseCSV.parse(content, {
      header: true,
      skipEmptyLines: true,
    });
    const products = productsCSV.data.map(productMapper);
    const result = await importItems(products);

    setModal(
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">
          {formatMessage({
            id: 'import_results',
            defaultMessage: 'Import Results',
          })}
        </h3>
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
              {result.errors.slice(0, 10).map((err, i) => (
                <p key={i} className="text-sm text-red-500">
                  {err}
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
        <Button
          onClick={() => setModal('')}
          className="mt-4"
          text={formatMessage({ id: 'close', defaultMessage: 'Close' })}
        />
      </div>,
    );

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (!hasRole('addProduct')) return null;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
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

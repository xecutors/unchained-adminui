import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Button from '../../common/components/Button';
import useProducts from '../hooks/useProducts';
import useAuth from '../../Auth/useAuth';

const ProductExport = () => {
  const { formatMessage } = useIntl();
  const { hasRole } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const { products: allProducts } = useProducts({
    limit: 10000, // Large limit to get all products
    offset: 0,
    includeDrafts: true,
  });

  const convertToCSV = (products: any[]) => {
    if (!products || products.length === 0) return '';

    const headers = [
      'ID',
      'Title',
      'Slug',
      'Status',
      'Type',
      'Tags',
      'Sequence',
      'Price',
      'Currency',
      'Description',
      'Vendor',
      'Brand',
      'Labels',
      'Created',
      'Updated',
      'Published',
    ];

    const rows = products.map(product => [
      product._id,
      product.texts?.title || '',
      product.texts?.slug || '',
      product.status,
      product.__typename || product.type || 'SimpleProduct',
      product.tags?.join(';') || '',
      product.sequence || '',
      product.catalogPrice?.amount || '',
      product.catalogPrice?.currencyCode || '',
      product.texts?.description || '',
      product.texts?.vendor || '',
      product.texts?.brand || '',
      product.texts?.labels?.join(';') || '',
      product.created || '',
      product.updated || '',
      product.published || '',
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    return csvContent;
  };

  const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExport = () => {
    if (!hasRole('showProduct') || !allProducts) return;

    setIsExporting(true);
    try {
      const csvContent = convertToCSV(allProducts);
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `products_export_${timestamp}.csv`;
      
      downloadCSV(csvContent, filename);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (!hasRole('showProduct')) return null;

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="secondary"
      text={
        isExporting
          ? formatMessage({ id: 'exporting', defaultMessage: 'Exporting...' })
          : formatMessage({ id: 'export', defaultMessage: 'Export' })
      }
    />
  );
};

export default ProductExport;
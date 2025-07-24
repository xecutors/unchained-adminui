import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import FormWrapper from '../../common/components/FormWrapper';
import HelpText from '../../common/components/HelpText';
import useProductAssignments from '../hooks/useProductAssignments';
import Table from '../../common/components/Table';
import { matrixGenerator } from '../utils/productAssignment.utils';
import ProductAssignmentRow from './ProductAssignmentRow';

const ProductAssignmentForm = ({ proxyId, disabled = false }) => {
  const { formatMessage } = useIntl();

  const { product, loading } = useProductAssignments({ productId: proxyId });
  const variations = (product && product?.variations) || [];
  const assignments = (product && product.assignments) || [];

  const columnKeys = useMemo(
    () =>
      variations.filter(({ options }) => options.length).map(({ key }) => key),
    [variations],
  );

  const keyValueCombinations = useMemo(
    () =>
      variations.map(({ key, options }) => ({
        values: options?.map((option) => option.value),
        key,
      })),
    [variations],
  );

  const allRowsPossible = useMemo(() => {
    const validCombos = keyValueCombinations.filter(
      ({ values }) => values?.length,
    );
    return validCombos.length > 0 ? matrixGenerator(validCombos, [], 0) : [];
  }, [keyValueCombinations]);

  const allAssignedRows = useMemo(() => {
    const map = {};
    assignments?.forEach((assignment) => {
      const selector = {};
      assignment.vectors.forEach((v) => {
        selector[v?.variation?.key] = v?.option?.value;
      });
      map[Object.values(selector).join('')] = assignment.product;
    });
    return map;
  }, [assignments]);

  const rows = useMemo(() => {
    return allRowsPossible
      .map((row) => {
        const hash = Object.values(row).join('');
        const vals = Object.values(row);
        return {
          _id: hash,
          product: allAssignedRows[hash],
          columns: vals,
          columnsText: vals,
        };
      })
      .sort((a, b) => {
        const aHas = !!a.product;
        const bHas = !!b.product;
        if ((aHas && bHas) || (!aHas && !bHas)) {
          return a.columns.length - b.columns.length;
        }
        return aHas ? -1 : 1;
      });
  }, [allRowsPossible, allAssignedRows]);

  const hasVariations = useMemo(() => variations.length > 0, [variations]);
  const hasVariationOptions = useMemo(
    () => variations.some((v) => v.options && v.options.length > 0),
    [variations],
  );

  return (
    <FormWrapper>
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
              {formatMessage({
                id: 'product_assignments_explanation_title',
                defaultMessage: 'About Product Assignments',
              })}
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              {formatMessage({
                id: 'product_assignments_explanation_text',
                defaultMessage:
                  "Product assignments allow you to link specific products to each unique combination of variation options. For example, if you have a t-shirt with 'Size' and 'Color' variations, you can assign different product SKUs to each combination like 'Large + Red' or 'Small + Blue'. This is useful for managing inventory, pricing, and product details for each specific variant.",
              })}
            </p>
          </div>
        </div>
      </div>
      {!hasVariations && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <InformationCircleIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {formatMessage({
              id: 'no_variations_configured',
              defaultMessage:
                'No variations configured yet. Please add variations and their options in the Variations tab first.',
            })}
          </h3>
        </div>
      )}
      {hasVariations && hasVariationOptions && (
        <>
          <div className="mb-4">
            <HelpText
              messageKey="assignment_matrix_help"
              defaultMessage="Each row represents a unique combination of your product variations. Assign a specific product to each combination to create a complete product catalog."
            />
          </div>

          <Table>
            <Table.Row>
              {columnKeys.map((key) => (
                <Table.Cell
                  key={key}
                  className="font-semibold bg-gray-50 dark:bg-gray-800"
                >
                  {variations.find((v) => v.key === key)?.texts?.title || key}
                </Table.Cell>
              ))}
              <Table.Cell className="font-semibold bg-gray-50 dark:bg-gray-800">
                {formatMessage({
                  id: 'assigned_product_column_header',
                  defaultMessage: 'Assigned Product',
                })}
              </Table.Cell>
              <Table.Cell className="font-semibold bg-gray-50 dark:bg-gray-800">
                {formatMessage({
                  id: 'actions_column_header',
                  defaultMessage: 'Actions',
                })}
              </Table.Cell>
            </Table.Row>

            {rows.length > 0 &&
              rows.map(({ _id, columns, product: variationProduct }) => (
                <ProductAssignmentRow
                  key={_id}
                  columns={columns}
                  disabled={disabled}
                  loading={loading}
                  product={product}
                  variationProduct={variationProduct}
                  columnKeys={columnKeys}
                  proxyId={proxyId}
                />
              ))}
          </Table>
        </>
      )}

      {hasVariations && !hasVariationOptions && (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4">
            <InformationCircleIcon className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {formatMessage({
              id: 'assign_product_needs_variations',
              defaultMessage:
                'Please configure all variation options before assigning a product.',
            })}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatMessage({
              id: 'assignment_matrix_help',
              defaultMessage:
                'Each row represents a unique combination of your product variations. Assign a specific product to each combination to create a complete product catalog.',
            })}
          </p>
        </div>
      )}
    </FormWrapper>
  );
};

export default ProductAssignmentForm;

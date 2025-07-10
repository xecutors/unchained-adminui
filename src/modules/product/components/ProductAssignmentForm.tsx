import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import FormWrapper from '../../common/components/FormWrapper';
import HelpText from '../../common/components/HelpText';

import useAddProductAssignment from '../hooks/useAddProductAssignment';

import useProductAssignments from '../hooks/useProductAssignments';
import Table from '../../common/components/Table';
import TableActionsMenu from '../../common/components/TableActionsMenu';
import useRemoveProductAssignment from '../hooks/useRemoveProductAssignment';
import useModal from '../../modal/hooks/useModal';
import DangerMessage from '../../modal/components/DangerMessage';
import deBounce from '../../common/utils/deBounce';
import useProducts from '../hooks/useProducts';
import { ISortDirection } from '../../../gql/types';
import useTheme from '../../common/hooks/useTheme';
import UnchainedSelect from '../../common/components/UnchainedSelect';

const matrixGenerator = (columns, rowContainer, currentIndex) => {
  const column = columns[currentIndex];
  const newRows = [];
  column?.values
    .filter((v) => v.length)
    .forEach((value) => {
      const tempRow = {};
      tempRow[column.key] = value;
      if (rowContainer.length > 0) {
        rowContainer.forEach((oldRow) => {
          newRows.push({ ...oldRow, ...tempRow });
        });
      } else {
        newRows.push(tempRow);
      }
    });

  if (columns.length > currentIndex + 1) {
    return matrixGenerator(columns, newRows, currentIndex + 1);
  }
  return Array.from(new Set(newRows.map((r) => JSON.stringify(r)))).map((r) =>
    JSON.parse(r),
  );
};

const normalizeProduct = ({ _id, texts }: any) => ({
  value: _id,
  label: texts?.title,
});

const ProductAssignmentForm = ({ proxyId, disabled = false }) => {
  const { formatMessage } = useIntl();
  const { addProductAssignment } = useAddProductAssignment();
  const { removeProductAssignment } = useRemoveProductAssignment();
  const { setModal } = useModal();
  const { theme } = useTheme();

  const [queryString, setQueryString] = useState('');
  const { products } = useProducts({
    queryString,
    limit: 50,
    sort: [{ key: 'created', value: ISortDirection.Desc }],
  });
  const { product, loading } = useProductAssignments({ productId: proxyId });

  const variations = (product && product?.variations) || [];

  const columnKeys = variations
    .filter(({ options }) => options.length)
    .map(({ key }) => key);

  const keyValueCombinations = variations.map(({ key, options }) => ({
    values: (options || []).map((option) => option.value),
    key,
  }));

  const allRowsPossible =
    keyValueCombinations.length > 0
      ? matrixGenerator(
          keyValueCombinations.filter(({ values }) => values.length),
          [],
          0,
        )
      : [];
  const assignments = (product && product.assignments) || [];
  const allAssignedRows = {};
  assignments.forEach((assignment) => {
    const selector = {};
    assignment.vectors.forEach((vector) => {
      selector[vector?.variation?.key] = vector?.option?.value;
    });
    allAssignedRows[Object.values(selector).join('')] = assignment.product;
  });

  const rows = allRowsPossible
    .map((row) => {
      const hash = Object.values(row).join('');
      return {
        _id: hash,
        product: allAssignedRows[hash],
        columns: Object.values(row),
        columnsText: Object.values(row),
      };
    })
    .sort((row, row2) => {
      if ((row.product && row2.product) || (!row.product && !row2.product)) {
        return row.columns.length > row2.columns.length ? 1 : -1;
      }
      if (row.product) return -1;
      if (row2.product) return 1;
      return 0;
    });

  const getRowVector = (optionValue, index) => ({
    key: columnKeys[index],
    value: optionValue,
  });

  const handleProductAssignment = (context) => {
    const assignVector = async ({ value: productId }) => {
      const vectors = context.map(getRowVector);

      await addProductAssignment({ proxyId, productId, vectors });
    };

    return assignVector;
  };

  const handleRemoveAssignment = (context) => {
    const removeAssignment = async () => {
      await setModal(
        <DangerMessage
          onCancelClick={async () => setModal('')}
          message={formatMessage({
            id: 'delete_product_assignment',
            defaultMessage:
              'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this assignment? ',
          })}
          onOkClick={async () => {
            setModal('');
            const vectors = context.map(getRowVector);
            await removeProductAssignment({ proxyId, vectors });
          }}
          okText={formatMessage({
            id: 'delete_variation_assignment',
            defaultMessage: 'Delete assignment',
          })}
        />,
      );
    };
    return removeAssignment;
  };
  const debouncedQuery = deBounce(200)(setQueryString);

  // Check if we have any variations configured
  const hasVariations = variations.length > 0;
  const hasVariationOptions = variations.some(
    (v) => v.options && v.options.length > 0,
  );

  return (
    <FormWrapper>
      {/* Explanation Section */}
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

      {/* No variations message */}
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

      {/* Assignment matrix */}
      {hasVariations && hasVariationOptions && (
        <>
          <div className="mb-4">
            <HelpText
              messageKey="assignment_matrix_help"
              defaultMessage="Each row represents a unique combination of your product variations. Assign a specific product to each combination to create a complete product catalog."
            />
          </div>

          <Table>
            {/* Enhanced table header */}
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

            {rows.map(({ _id, columns, product: variationProduct }) => (
              <Table.Row key={_id}>
                {columns.map((columnText, index) => (
                  <Table.Cell
                    key={`${columnText}${_id}`}
                    className="font-medium"
                  >
                    {columnText}
                  </Table.Cell>
                ))}

                <Table.Cell>
                  {variationProduct ? (
                    <div className="flex items-center">
                      <span className="text-green-700 dark:text-green-300 font-medium">
                        {variationProduct?.texts?.title}
                      </span>
                    </div>
                  ) : product.variations?.length !== columns.length ? (
                    <div className="mt-1 text-sm text-rose-600 italic">
                      {formatMessage({
                        id: 'assign_product_needs_variations',
                        defaultMessage:
                          'Please configure all variation options before assigning a product.',
                      })}
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <UnchainedSelect
                        name={`productId-${_id}`}
                        placeholder={formatMessage({
                          id: 'search_product',
                          defaultMessage: 'Search product',
                        })}
                        isLoading={loading}
                        isDisabled={disabled}
                        onChange={handleProductAssignment(columns) as any}
                        onInputChange={debouncedQuery}
                        value={queryString}
                        options={
                          (products || [])
                            .map(normalizeProduct)
                            .filter(
                              ({ value }) => value !== proxyId,
                            ) as unknown as OptionsOrGroups<
                            string,
                            GroupBase<string>
                          >
                        }
                        className="mt-1 w-full py-2 text-sm font-medium text-slate-500"
                      />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {variationProduct && variationProduct._id && (
                    <DeleteButton onClick={handleRemoveAssignment(columns)} />
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </>
      )}

      {/* Show when variations exist but no options */}
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

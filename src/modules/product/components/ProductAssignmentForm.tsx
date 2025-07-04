import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';

import FormWrapper from '../../common/components/FormWrapper';

import useAddProductAssignment from '../hooks/useAddProductAssignment';

import DeleteButton from '../../common/components/DeleteButton';
import useProductAssignments from '../hooks/useProductAssignments';
import Table from '../../common/components/Table';
import useRemoveProductAssignment from '../hooks/useRemoveProductAssignment';
import useModal from '../../modal/hooks/useModal';
import DangerMessage from '../../modal/components/DangerMessage';
import deBounce from '../../common/utils/deBounce';
import useProducts from '../hooks/useProducts';
import { ISortDirection } from '../../../gql/types';

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

  return (
    <FormWrapper>
      <Table>
        {rows.map(({ _id, columns, product: variationProduct }) => (
          <Table.Row key={_id}>
            {columns.map((columnText) => (
              <Table.Cell key={`${columnText}${_id}`}>{columnText}</Table.Cell>
            ))}

            <Table.Cell>
              {' '}
              {variationProduct ? (
                variationProduct?.texts?.title
              ) : (
                <Select
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
                    (products || []).map(
                      normalizeProduct,
                    ) as unknown as OptionsOrGroups<string, GroupBase<string>>
                  }
                  className="mt-1 w-full py-2 text-sm font-medium text-slate-500"
                />
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
    </FormWrapper>
  );
};

export default ProductAssignmentForm;

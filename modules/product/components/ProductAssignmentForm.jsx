import { useState } from 'react';
import { useIntl } from 'react-intl';
import Select from 'react-select';

import FormWrapper from '../../common/components/FormWrapper';

import useAddProductAssignment from '../hooks/useAddProductAssignment';
import useSearchProducts from '../hooks/useSearchProducts';

import DeleteButton from '../../common/components/DeleteButton';
import useProductAssignments from '../hooks/useProductAssignments';
import Table from '../../common/components/Table';
import useRemoveProductAssignment from '../hooks/useRemoveProductAssignment';

const matrixGenerator = (columns, rowContainer, currentIndex) => {
  const column = columns[currentIndex];
  const newRows = [];

  column.values
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
  return newRows;
};

const normalizeProduct = ({ _id, texts }) => ({
  value: _id,
  label: texts?.title,
});

const ProductAssignmentForm = ({ proxyId }) => {
  const { formatMessage } = useIntl();
  const { addProductAssignment } = useAddProductAssignment();
  const { removeProductAssignment } = useRemoveProductAssignment();
  const { product } = useProductAssignments({ productId: proxyId });

  const variations = (product && product.variations) || [];

  const columnTitles = variations
    .filter(({ options }) => options.length)
    .map(({ texts, key }) => texts?.title || key);
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
    .sort((row) => (row.product ? -1 : 1));

  const [queryString, setQueryString] = useState('');
  const { products } = useSearchProducts({
    queryString,
    limit: 50,
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
      const vectors = context.map(getRowVector);
      await removeProductAssignment({ proxyId, vectors });
    };
    return removeAssignment;
  };

  return (
    <FormWrapper>
      <Table>
        <Table.Row header>
          {columnTitles.map((title) => (
            <Table.Cell className="capitalize" key={title}>
              {title}{' '}
            </Table.Cell>
          ))}
          <Table.Cell
            key={formatMessage({ id: 'product', defaultMessage: 'Product' })}
          >
            {formatMessage({ id: 'product', defaultMessage: 'Product' })}{' '}
          </Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
        </Table.Row>

        {rows.map(({ _id, columns, product: variationProduct }) => (
          <Table.Row key={_id}>
            {columns.map((columnText) => (
              <Table.Cell>{columnText}</Table.Cell>
            ))}

            <Table.Cell>
              {' '}
              {variationProduct ? (
                variationProduct?.texts?.title
              ) : (
                <Select
                  name="productId"
                  placeholder={formatMessage({
                    id: 'search_product',
                    defaultMessage: 'Search product',
                  })}
                  onChange={handleProductAssignment(columns)}
                  onInputChange={setQueryString}
                  options={(products || []).map(normalizeProduct)}
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

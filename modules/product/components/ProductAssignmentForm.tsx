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
import Link from 'next/link';
import VariationOptionDisplay from './VariationOptionDisplay';

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

const ProductAssignmentForm = ({ proxyId }) => {
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
  const allAssignedRowsProducts = {};
  assignments.forEach((assignment) => {
    const selector = {};
    assignment.vectors.forEach((vector) => {
      selector[vector?.variation?.key] = vector?.option?.value;
    });

    allAssignedRowsProducts[Object.values(selector).join('')] = {
      [assignment.product?._id]: [assignment.product?.texts?.title],
    };
  });
  const rows = allRowsPossible
    .map((row) => {
      const hash = Object.values(row).join('');
      return {
        _id: hash,
        columns: Object.values(row),
      };
    })
    .sort((row, row2) => {
      return row.columns.length > row2.columns.length ? 1 : -1;
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
    <>
      <FormWrapper>
        <Table>
          {rows.map(({ _id, columns }) => (
            <Table.Row key={_id}>
              {columns.map((columnText) => (
                <Table.Cell key={`${columnText}${_id}`}>
                  {columnText}
                </Table.Cell>
              ))}

              <Table.Cell>
                <Select
                  name={`productId-${_id}`}
                  placeholder={formatMessage({
                    id: 'search_product',
                    defaultMessage: 'Search product',
                  })}
                  isLoading={loading}
                  onChange={handleProductAssignment(columns) as any}
                  onInputChange={debouncedQuery}
                  value={queryString}
                  options={
                    (products || [])
                      .filter(
                        (p) =>
                          !allAssignedRowsProducts?.[columns.join('')]?.[p._id],
                      )
                      .map(normalizeProduct) as unknown as OptionsOrGroups<
                      string,
                      GroupBase<string>
                    >
                  }
                  className="mt-1 w-full py-2 text-sm font-medium text-slate-500"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </FormWrapper>
      <Table>
        <Table.Row header>
          <Table.Cell>Variation</Table.Cell>
          <Table.Cell>Options</Table.Cell>
          <Table.Cell>Product</Table.Cell>
        </Table.Row>

        {assignments.map((assignment, index) => (
          <Table.Row key={`${assignment?._id}-display`}>
            <Table.Cell>
              {assignment.vectors
                .map((vector) => vector.variation.texts.title)
                .join(', ')}
            </Table.Cell>
            <Table.Cell>
              <VariationOptionDisplay vectors={assignment.vectors} />
            </Table.Cell>
            <Table.Cell>
              <Link href={assignment.product.texts.slug}>
                <strong>{assignment.product.texts.title}</strong>
              </Link>
            </Table.Cell>
            <Table.Cell>
              <DeleteButton
                onClick={handleRemoveAssignment(
                  assignment.vectors.map((vector) => vector.option?.value),
                )}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </>
  );
};

export default ProductAssignmentForm;

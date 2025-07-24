import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { ISortDirection } from '../../../gql/types';
import DeleteButton from '../../common/components/DeleteButton';
import UnchainedSelect from '../../common/components/UnchainedSelect';
import deBounce from '../../common/utils/deBounce';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useAddProductAssignment from '../hooks/useAddProductAssignment';
import useProducts from '../hooks/useProducts';
import useRemoveProductAssignment from '../hooks/useRemoveProductAssignment';
import {
  getRowVector,
  normalizeProduct,
} from '../utils/productAssignment.utils';
import Table from '../../common/components/Table';

const ProductAssignmentRow = ({
  columns,
  variationProduct,
  product,
  loading,
  disabled,
  proxyId,
  columnKeys,
}) => {
  const { formatMessage } = useIntl();

  const [queryString, setQueryString] = useState('');
  const { addProductAssignment } = useAddProductAssignment();
  const { removeProductAssignment } = useRemoveProductAssignment();
  const { setModal } = useModal();
  const { products } = useProducts({
    queryString,
    limit: 50,
    sort: [{ key: 'created', value: ISortDirection.Desc }],
  });

  const handleProductAssignment = (context) => {
    const assignVector = async ({ value: productId }) => {
      const vectors = context.map((optionValue, index) =>
        getRowVector(optionValue, index, columnKeys),
      );

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
            const vectors = context.map((optionValue, index) =>
              getRowVector(optionValue, index, columnKeys),
            );
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
  const assignHandler = useMemo(
    () => handleProductAssignment(columns),
    [columns, columnKeys, proxyId],
  );
  const removeHandler = useMemo(
    () => handleRemoveAssignment(columns),
    [columns, columnKeys, proxyId],
  );

  const debouncedQuery = useMemo(() => deBounce(200)(setQueryString), []);
  const showMismatchWarning =
    !variationProduct && product?.variations?.length !== columns?.length;

  const selectOptions = useMemo(() => {
    return (
      products
        ?.map(normalizeProduct)
        .filter(({ value }) => value !== proxyId) || []
    );
  }, [products, proxyId]);

  return (
    <Table.Row>
      {columns.map((columnText, index) => (
        <Table.Cell key={`${columnText}`} className="font-medium">
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
        ) : showMismatchWarning ? (
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
              name={`productId`}
              placeholder={formatMessage({
                id: 'search_product',
                defaultMessage: 'Search product',
              })}
              isLoading={loading}
              isDisabled={disabled}
              onChange={assignHandler}
              onInputChange={debouncedQuery}
              options={selectOptions}
              className="mt-1 w-full py-2 text-sm font-medium text-slate-500"
            />
          </div>
        )}
      </Table.Cell>
      <Table.Cell>
        {variationProduct && variationProduct._id && (
          <DeleteButton onClick={removeHandler} />
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default ProductAssignmentRow;

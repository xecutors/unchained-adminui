import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import NoData from '../../common/components/NoData';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useCreateProductVariationOption from '../hooks/useCreateProductVariationOption';
import useRemoveProductVariationOption from '../hooks/useRemoveProductVariationOption';

import ProductVariationOptionForm from './ProductVariationOptionForm';
import ProductVariationOptionItem from './ProductVariationOptionItem';

const ProductVariationOptionsList = ({
  variationId,
  options,
  selectedLocale,
}) => {
  const { createProductVariationOption } = useCreateProductVariationOption();
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { removeProductVariationOption } = useRemoveProductVariationOption();

  const onDeleteOption = async (productVariationOptionValue) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_product_variation_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this option? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeProductVariationOption({
            productVariationId: variationId,
            productVariationOptionValue,
          });
          toast.success(
            formatMessage({
              id: 'product_variation_option_deleted',
              defaultMessage: 'Variation option deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_product_variation',
          defaultMessage: 'Delete option',
        })}
      />,
    );
  };

  const onSubmit = async ({ value, title }) => {
    await createProductVariationOption({
      productVariationId: variationId,
      value,
      title,
    });
    return true;
  };

  return (
    <div>
      <ProductVariationOptionForm onSubmit={onSubmit} />
      {options.length ? (
        options.map((option) => (
          <ProductVariationOptionItem
            locale={selectedLocale}
            variationId={variationId}
            key={option._id}
            option={option}
            selectedLocale={selectedLocale}
            onDelete={onDeleteOption}
          />
        ))
      ) : (
        <NoData
          message={formatMessage({ id: 'option', defaultMessage: 'Option' })}
        />
      )}
    </div>
  );
};

export default ProductVariationOptionsList;

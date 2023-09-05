import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import NoData from '../../common/components/NoData';
import { OnSubmitType } from '../../forms/hooks/useForm';
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
          id: 'delete_variation_option_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this option? ',
        })}
        onCancelClick={() => setModal('')}
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
          id: 'delete_variation_option',
          defaultMessage: 'Delete option',
        })}
      />,
    );
  };

  const onSubmit: OnSubmitType = async ({ value, title }) => {
    await createProductVariationOption({
      productVariationId: variationId,
      option: { value, title },
    });
    return { success: true };
  };

  return (
    <div>
      <ProductVariationOptionForm onSubmit={onSubmit} />
      {options.length ? (
        options.map((option) => (
          <ProductVariationOptionItem
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

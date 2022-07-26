import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import Accordion from '../../common/components/Accordion';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useRemoveProductVariation from '../hooks/useRemoveProductVariation';

import Variation from './Variation';
import ProductVariationOptionsList from './ProductVariationOptionsList';

const ProductVariationsList = ({
  productVariationId,
  selectedLocale,
  variation,
}) => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { options } = variation;
  const { removeProductVariation } = useRemoveProductVariation();

  const onDeleteVariation = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_product_variation_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this variation? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeProductVariation({ productVariationId });
          toast.success(
            formatMessage({
              id: 'product_variation_deleted',
              defaultMessage: 'Variation deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_product_variation',
          defaultMessage: 'Delete variation',
        })}
      />,
    );
  };

  const variations = [
    {
      header: (
        <Variation
          onDelete={onDeleteVariation}
          selectedLocale={selectedLocale}
          variation={variation}
          {...variation}
        />
      ),
      body: (
        <ProductVariationOptionsList
          selectedLocale={selectedLocale}
          key={productVariationId}
          variationId={variation._id}
          options={options}
        />
      ),
    },
  ];

  return (
    <Accordion
      data-variationId={variation._id}
      data={variations}
      containerCSS="w-full my-0"
      bodyCSS="bg-white dark:bg-slate-800"
      itemContainerCSS="mt-0 my-0"
      headerCSS="w-full flex items-center rounded justify-between p-2 bg-white dark:bg-slate-800"
    />
  );
};

export default ProductVariationsList;

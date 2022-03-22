import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import Accordion from '../../common/components/Accordion';
import DangerMessage from '../../modal/components/DangerMessage';
import useModal from '../../modal/hooks/useModal';
import useRemoveProductVariation from '../hooks/useRemoveProductVariation';
import useTranslatedProductVariationTexts from '../hooks/useTranslatedProductVariationTexts';
import ProductVariation from './ProductVariation';
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
  const { translatedVariationTexts } = useTranslatedProductVariationTexts({
    productVariationId,
  });

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
            formatMessage(
              {
                id: 'product_variation_deleted',
                defaultMessage:
                  'Variation {productVariationId} deleted successfully',
              },
              {
                productVariationId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_product_variation',
          defaultMessage: 'Delete variation',
        })}
      />,
    );
  };

  const variations = translatedVariationTexts
    .filter(({ locale }) => locale === selectedLocale)
    .map((variationText) => ({
      header: (
        <ProductVariation
          onDelete={onDeleteVariation}
          selectedLocale={selectedLocale}
          variationText={variationText}
          variation={variation}
          key={variationText.title}
          {...variation}
        />
      ),
      body: (
        <ProductVariationOptionsList
          key={productVariationId}
          variationId={variation._id}
          options={options}
        />
      ),
    }));

  return <Accordion data={variations} />;
};

export default ProductVariationsList;

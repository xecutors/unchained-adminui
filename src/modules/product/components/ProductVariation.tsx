import { useIntl } from 'react-intl';
import Loading from '../../common/components/Loading';
import NoData from '../../common/components/NoData';
import { OnSubmitType } from '../../forms/hooks/useForm';
import useCreateProductVariation from '../hooks/useCreateProductVariation';
import useProductVariations from '../hooks/useProductVariations';
import ProductVariationForm from './ProductVariationForm';

import ProductVariationsList from './ProductVariationsList';

const ProductVariation = ({
  productId,
  selectedLocale = null,
  disabled = false,
}) => {
  const { createProductVariation } = useCreateProductVariation();
  const { formatMessage } = useIntl();

  const { variations, loading } = useProductVariations({
    productId,
  });

  const onSubmit: OnSubmitType = async ({ title, key, type }) => {
    await createProductVariation({
      productId,
      variation: { key, type },
      texts: [{ title, locale: selectedLocale || 'de' }],
    });
    return { success: true };
  };
  if (loading) return <Loading />;

  return (
    <div className="mt-6 overflow-hidden rounded-md">
      <div className="lg:grid lg:grid-cols-12">
        <div className="mb-5 lg:col-span-5 lg:pr-5 ">
          <ProductVariationForm onSubmit={onSubmit} disabled={disabled} />
        </div>
        <div className="lg:col-span-7 lg:w-full">
          <div className="flex flex-col gap-y-2">
            {!variations?.length ? (
              <NoData
                message={formatMessage({
                  id: 'variation',
                  defaultMessage: 'Variation product',
                })}
              />
            ) : (
              variations?.map((variation) => (
                <ProductVariationsList
                  selectedLocale={selectedLocale}
                  productVariationId={variation._id}
                  key={variation._id}
                  variation={variation}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductVariation;

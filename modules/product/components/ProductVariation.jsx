import { useIntl } from 'react-intl';
import Loading from '../../common/components/Loading';
import NoData from '../../common/components/NoData';
import useCreateProductVariation from '../hooks/useCreateProductVariation';
import useProductVariations from '../hooks/useProductVariations';
import ProductVariationForm from './ProductVariationForm';

import ProductVariationsList from './ProductVariationsList';

const ProductVariation = ({ productId, selectedLocale }) => {
  const { createProductVariation } = useCreateProductVariation();
  const { formatMessage } = useIntl();

  const { variations, loading } = useProductVariations({
    productId,
    locale: selectedLocale,
  });

  const onSubmit = async ({ title, key, type }) => {
    await createProductVariation({ productId, key, type, title });
    return true;
  };
  if (loading) return <Loading />;

  return (
    <div className="mt-6 overflow-hidden rounded-md">
      <div className="lg:grid lg:grid-cols-12">
        <div className="mb-5 lg:col-span-5 lg:pr-5 ">
          <ProductVariationForm onSubmit={onSubmit} />
        </div>
        <div className="lg:col-span-7 lg:w-full">
          <div className="flex flex-col gap-y-2">
            {!variations?.length ? (
              <NoData
                className={formatMessage({
                  id: 'variation',
                  defaultMessage: 'Variation',
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

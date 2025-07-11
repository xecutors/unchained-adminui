import React from 'react';
import { IProduct } from '../../gql/types';
import { useFormatPrice } from '../../modules/common/utils/utils';
import ProductDetailCompact from './ProductDetailCompact';

type Variation = {
  key: string;
  type: string;
  options: string[];
};

type Price = {
  amount: number;
  currencyCode: string;
};

type PriceRange = {
  minPrice: Price;
  maxPrice: Price;
};

type Props = {
  product: IProduct & {
    type: string;
    variations: Variation[];
    proxy?: { assignments?: any[] };
  };
  priceRange: PriceRange;
};

const SimulatedPriceRangeCompact: React.FC<Props> = ({
  product,
  priceRange,
}) => {
  const { formatPrice } = useFormatPrice();
  const { minPrice, maxPrice } = priceRange;

  const isSamePrice = minPrice.amount === maxPrice.amount;
  const displayPrice = isSamePrice
    ? formatPrice(minPrice)
    : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`;

  return (
    <ProductDetailCompact product={product}>
      <div className="text-sm font-medium text-slate-900 dark:text-white min-w-[100px] text-center">
        {displayPrice}
      </div>
    </ProductDetailCompact>
  );
};

export default SimulatedPriceRangeCompact;

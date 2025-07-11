import React from 'react';
import { IProduct } from '../../gql/types';
import { useFormatPrice } from '../../modules/common/utils/utils';
import ProductDetailCompact from './ProductDetailCompact';
import { useIntl } from 'react-intl';

type Price = {
  amount: number;
  currencyCode: string;
  isNetPrice: boolean;
  isTaxable: boolean;
};

type Props = {
  product: IProduct & any;

  price: Price;
};

const SimulatedPriceCompact: React.FC<Props> = ({ product, price }) => {
  const { formatPrice } = useFormatPrice();
  const { formatMessage } = useIntl();

  return (
    <ProductDetailCompact product={product}>
      <div className="flex flex-col text-sm text-center min-w-[120px]">
        <span className="font-semibold text-slate-900 dark:text-white">
          {formatPrice(price)}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {price.isNetPrice
            ? formatMessage({ id: 'net_price', defaultMessage: 'Net' })
            : formatMessage({
                id: 'gross_price',
                defaultMessage: 'Gross',
              })}{' '}
          ·{' '}
          {price.isTaxable
            ? formatMessage({ id: 'taxable', defaultMessage: 'Taxable' })
            : formatMessage({
                id: 'non_taxable',
                defaultMessage: 'Non-Taxable',
              })}
        </span>
      </div>
    </ProductDetailCompact>
  );
};

export default SimulatedPriceCompact;

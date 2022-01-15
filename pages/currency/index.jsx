import { useState } from 'react';
import Layout from '../../modules/common/components/Layout';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CurrencyList from '../../modules/currency/component/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';

const Currencies = ({ ...pageProps }) => {
  const [limit, setLimit] = useState(DefaultLimit);

  const { currencies, currenciesCount, loadMore } = useCurrencies({
    limit,
  });
  const { removeCurrency } = useRemoveCurrency();

  const onRemove = async (currencyId) => {
    await removeCurrency({ currencyId });
  };
  return (
    <Layout {...pageProps}>
      <CurrencyList
        currencies={currencies}
        onRemoveCurrency={onRemove}
        total={currenciesCount}
        onLimitChange={setLimit}
        onLoadMore={loadMore}
      />
    </Layout>
  );
};

export default Currencies;

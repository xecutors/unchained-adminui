import { useState } from 'react';
import { useIntl } from 'react-intl';
import Layout from '../../modules/common/components/Layout';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CurrencyList from '../../modules/currency/component/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';

const Currencies = ({ ...pageProps }) => {
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeInactive, setIncludeInactive] = useState(false);

  const { formatMessage } = useIntl();
  const { currencies, currenciesCount, loadMore } = useCurrencies({
    limit,
    includeInactive,
  });
  const { removeCurrency } = useRemoveCurrency();

  const onRemove = async (currencyId) => {
    await removeCurrency({ currencyId });
  };
  return (
    <Layout
      {...pageProps}
      pageHeader={formatMessage({
        id: 'currencies',
        defaultMessage: 'Currencies',
      })}
    >
      <CurrencyList
        currencies={currencies}
        onRemoveCurrency={onRemove}
        total={currenciesCount}
        onLimitChange={setLimit}
        onLoadMore={loadMore}
        onIncludeInactiveChange={setIncludeInactive}
        includeInactive={includeInactive}
      />
    </Layout>
  );
};

export default Currencies;

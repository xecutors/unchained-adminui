import { useState } from 'react';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CurrencyList from '../../modules/currency/component/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';

const Currencies = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeInactive, setIncludeInactive] = useState(false);

  const { currencies, currenciesCount, loadMore } = useCurrencies({
    limit,
    includeInactive,
  });
  const { removeCurrency } = useRemoveCurrency();

  const onRemove = async (currencyId) => {
    await removeCurrency({ currencyId });
  };
  return (
    <CurrencyList
      currencies={currencies}
      onRemoveCurrency={onRemove}
      total={currenciesCount}
      onLimitChange={setLimit}
      onLoadMore={loadMore}
      onIncludeInactiveChange={setIncludeInactive}
      includeInactive={includeInactive}
    />
  );
};

export default Currencies;

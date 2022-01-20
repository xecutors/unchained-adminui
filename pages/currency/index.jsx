import { useState } from 'react';
import { useIntl } from 'react-intl';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CurrencyList from '../../modules/currency/component/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

const Currencies = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const { formatMessage } = useIntl();
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
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'currencies_list_header',
          defaultMessage: 'Currencies',
        })}
      />
      <CurrencyList
        currencies={currencies}
        onRemoveCurrency={onRemove}
        total={currenciesCount}
        onLimitChange={setLimit}
        onLoadMore={loadMore}
        onIncludeInactiveChange={setIncludeInactive}
        includeInactive={includeInactive}
      />
    </>
  );
};

export default Currencies;

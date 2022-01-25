import { useState } from 'react';
import { useIntl } from 'react-intl';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CurrencyList from '../../modules/currency/components/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import ListHeader from '../../modules/common/components/ListHeader';
import Toggle from '../../modules/common/components/Toggle';
import ListPagination from '../../modules/common/components/ListPagination';

const Currencies = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const { formatMessage } = useIntl();
  const [includeInactive, setIncludeInactive] = useState(false);

  const { currencies, currenciesCount, loadMore, loading } = useCurrencies({
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

      <div className="min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/currency/new">
          <Toggle
            toggleText={formatMessage({
              id: 'show_inactive',
              defaultMessage: 'Show Inactive',
            })}
            toggleState={includeInactive}
            onToggle={setIncludeInactive}
          />
        </ListHeader>

        <CurrencyList currencies={currencies} onRemoveCurrency={onRemove} />
        <ListPagination
          isLoading={loading}
          onLoadMore={loadMore}
          data={currencies}
          total={currenciesCount}
          onLimitChange={setLimit}
        />
      </div>
    </>
  );
};

export default Currencies;

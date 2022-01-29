import { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CurrencyList from '../../modules/currency/components/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import ListHeader from '../../modules/common/components/ListHeader';
import Toggle from '../../modules/common/components/Toggle';
import ListPagination from '../../modules/common/components/ListPagination';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';

const Currencies = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const { formatMessage } = useIntl();
  const [includeInactive, setIncludeInactive] = useState(false);

  const [offset, setOffset] = useState(0);

  const onOffsetChange = (value) => {
    setOffset(value);
  };

  const { currencies, currenciesCount, loadMore, loading } = useCurrencies({
    limit,
    includeInactive,
  });
  const { setModal } = useModal();
  const { removeCurrency } = useRemoveCurrency();
  const onRemove = async (currencyId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_currency_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this currency? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeCurrency({ currencyId });
          toast.success(
            formatMessage(
              {
                id: 'currency_deleted',
                defaultMessage: 'currency {id} deleted successfully',
              },
              {
                id: currencyId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_currency',
          defaultMessage: 'Delete currency',
        })}
      />,
    );
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

        {loading && (
          <CurrencyList currencies={currencies} onRemoveCurrency={onRemove} />
        )}
        <ListPagination
          onLoadMore={loadMore}
          data={currencies}
          total={currenciesCount}
          onLimitChange={setLimit}
          limit={limit}
          offset={offset}
          onOffsetChange={onOffsetChange}
        />
      </div>
    </>
  );
};

export default Currencies;

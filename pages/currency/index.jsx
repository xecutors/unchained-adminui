import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CurrencyList from '../../modules/currency/components/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import ListHeader from '../../modules/common/components/ListHeader';
import Toggle from '../../modules/common/components/Toggle';
import Pagination from '../../modules/common/components/Pagination';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import Loading from '../../modules/common/components/Loading';

const Currencies = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const includeInactive = query?.includeInactive === 'true';
  const { currencies, currenciesCount, loading } = useCurrencies({
    limit,
    offset,
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
            formatMessage({
              id: 'currency_deleted',
              defaultMessage: 'Currency deleted successfully',
            }),
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

      <div className="min-w-full overflow-x-auto">
        <ListHeader addPath="/currency/new">
          <Toggle
            toggleText={formatMessage({
              id: 'show_inactive',
              defaultMessage: 'Show Inactive',
            })}
            toggleKey="includeInactive"
          />
        </ListHeader>

        {loading ? (
          <Loading />
        ) : (
          <CurrencyList currencies={currencies} onRemoveCurrency={onRemove} />
        )}
        <Pagination data={currencies} total={currenciesCount} />
      </div>
    </>
  );
};

export default Currencies;

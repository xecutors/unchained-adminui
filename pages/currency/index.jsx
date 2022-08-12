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
import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import {
  getBoolean,
  getSortKeys,
  normalizeQuery,
} from '../../modules/common/utils/utils';

const Currencies = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const { hasRole } = useAuth();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const includeInactive =
    query?.includeInactive === 'true' || !query?.includeInactive;
  const sort = query?.sort || '';

  const { queryString, ...restQuery } = query;

  const setQueryString = (searchString) => {
    if (searchString)
      push({
        query: normalizeQuery(restQuery, searchString, 'queryString'),
      });
    else
      push({
        query: normalizeQuery(restQuery),
      });
  };
  const sortKeys = getSortKeys(sort);

  const { currencies, currenciesCount, loading } = useCurrencies({
    queryString,
    limit,
    offset,
    includeInactive,
    sort: sortKeys,
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

  const sortFields = {
    isoCode: formatMessage({
      id: 'iso_code',
      defaultMessage: 'ISO code',
    }),
    isActive: formatMessage({ id: 'active', defaultMessage: 'Active' }),
  };

  return (
    <>
      <BreadCrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'currencies_list_header',
            defaultMessage: 'Currencies',
          })}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>
      <div className="min-w-full overflow-x-auto">
        <ListHeader
          addPath={hasRole(ACTION_ROLES.currencies.create) && '/currency/new'}
          sortFields={sortFields}
        >
          <Toggle
            toggleText={formatMessage({
              id: 'show_inactive',
              defaultMessage: 'Show Inactive',
            })}
            toggleKey="includeInactive"
            active={includeInactive}
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

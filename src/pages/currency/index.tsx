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
import InfiniteScroll from '../../modules/common/components/InfiniteScroll';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import Loading from '../../modules/common/components/Loading';
import useAuth from '../../modules/Auth/useAuth';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import SearchWithTags from '../../modules/common/components/SearchWithTags';
import CurrencyDetailPage from './CurrencyDetailPage';
import AnimatedCounter from '../../modules/common/components/AnimatedCounter';

const Currencies = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const { hasRole } = useAuth();
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const includeInactive =
    query?.includeInactive === 'true' || !query?.includeInactive;
  const sort = query?.sort || '';

  const { queryString, currencyId, ...restQuery } = query;

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = restQuery;
    if (searchString) {
      push({
        query: normalizeQuery(withoutSkip, searchString, 'queryString'),
      });
    } else {
      push({
        query: normalizeQuery(restQuery),
      });
    }
  };
  const sortKeys = convertSortFieldsToQueryFormat(sort);

  const { currencies, currenciesCount, loading, loadMore, hasMore } =
    useCurrencies({
      queryString: queryString as string,
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
        onCancelClick={async () => setModal('')}
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

  if (currencyId) return <CurrencyDetailPage currencyId={currencyId} />;
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage(
          (currenciesCount ?? 0) === 1
            ? {
                id: 'currency_count_header_singular',
                defaultMessage: '1 Currency',
              }
            : {
                id: 'currencies_count_header',
                defaultMessage: '{count} Currencies',
              },
          { count: <AnimatedCounter value={currenciesCount ?? 0} /> },
        )}
        addPath={hasRole('addCurrency') && '/currency/new'}
        addButtonText={formatMessage({
          id: 'add_currency',
          defaultMessage: 'Add Currency',
        })}
      />
      <div className="min-w-full overflow-x-auto px-1">
        <ListHeader>
          <Toggle
            toggleText={formatMessage({
              id: 'show_inactive',
              defaultMessage: 'Show Inactive',
            })}
            toggleKey="includeInactive"
            active={includeInactive}
          />
        </ListHeader>

        <SearchWithTags
          onSearchChange={setQueryString}
          defaultSearchValue={queryString}
        >
          <InfiniteScroll
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          >
            {loading && currencies?.length === 0 ? (
              <Loading />
            ) : (
              <CurrencyList
                currencies={currencies}
                onRemoveCurrency={onRemove}
                sortable
              />
            )}
          </InfiniteScroll>
        </SearchWithTags>
      </div>
    </>
  );
};

export default Currencies;

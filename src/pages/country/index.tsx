import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import InfiniteScroll from '../../modules/common/components/InfiniteScroll';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CountryList from '../../modules/country/components/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';

import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import LocaleWrapper from '../../modules/common/components/LocaleWrapper';
import CountryDetailPage from './CountryDetailPage';

const Country = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const sort = query?.sort || '';
  const includeInactive =
    query?.includeInactive === 'true' || !query?.includeInactive;
  const { hasRole } = useAuth();

  const { queryString, countryId, ...restQuery } = query;

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

  const { countries, countriesCount, loading, loadMore, hasMore } = useCountries({
    queryString: queryString as string,
    limit,
    includeInactive,
    offset,
    sort: sortKeys,
  });

  const { setModal } = useModal();
  const { removeCountry } = useRemoveCountry();

  const onRemoveCountry = async (countryId) => {
    await setModal(
      <DangerMessage
        onCancelClick={async () => setModal('')}
        message={formatMessage({
          id: 'delete_country_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this country? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeCountry({ countryId });
          toast.success(
            formatMessage({
              id: 'country_deleted',
              defaultMessage: 'Country deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_country',
          defaultMessage: 'Delete country',
        })}
      />,
    );
  };

  if (countryId) return <CountryDetailPage countryId={countryId} />;

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage(
          (countriesCount ?? 0) === 1
            ? { id: 'country_count_header_singular', defaultMessage: '1 Country' }
            : { id: 'countries_count_header', defaultMessage: '{count} Countries' },
          { count: countriesCount ?? 0 }
        )}
      />
      <div className="min-w-full overflow-x-auto">
        <ListHeader
          addPath={hasRole('addCountry') && '/country/new'}
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
        <LocaleWrapper
          searchComponent={
            <SearchField
              defaultValue={queryString}
              onInputChange={setQueryString}
            />
          }
        >
          <InfiniteScroll
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          >
            {loading && countries?.length === 0 ? (
              <Loading />
            ) : (
              <CountryList
                sortable
                countries={countries}
                onRemoveCountry={onRemoveCountry}
              />
            )}
          </InfiniteScroll>
        </LocaleWrapper>
      </div>
    </>
  );
};

export default Country;

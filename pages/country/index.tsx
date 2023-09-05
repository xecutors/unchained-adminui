import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Pagination from '../../modules/common/components/Pagination';
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

const Country = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const sort = query?.sort || '';
  const includeInactive =
    query?.includeInactive === 'true' || !query?.includeInactive;
  const { hasRole } = useAuth();

  const { queryString, ...restQuery } = query;

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

  const { countries, countriesCount, loading } = useCountries({
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

  return (
    <>
      <BreadCrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'countries',
            defaultMessage: 'Countries',
          })}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>
      <div className="min-w-full overflow-x-auto">
        <ListHeader addPath={hasRole('addCountry') && '/country/new'}>
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
          <CountryList
            sortable
            countries={countries}
            onRemoveCountry={onRemoveCountry}
          />
        )}
        <Pagination data={countries} total={countriesCount} />
      </div>
    </>
  );
};

export default Country;

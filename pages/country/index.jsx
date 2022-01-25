import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import ListPagination from '../../modules/common/components/ListPagination';
import PageHeader from '../../modules/common/components/PageHeader';
import Toggle from '../../modules/common/components/Toggle';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CountryList from '../../modules/country/components/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';

const Country = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const { formatMessage } = useIntl();
  const [includeInactive, setIncludeInactive] = useState(false);
  const { countries, countriesCount, loadMore, loading } = useCountries({
    limit,
    includeInactive,
  });
  const { removeCountry } = useRemoveCountry();
  const onRemoveCountry = async (countryId) => {
    await removeCountry({ countryId });
  };
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'countries',
          defaultMessage: 'Countries',
        })}
      />
      <div className="min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/country/new">
          <Toggle
            toggleText={formatMessage({
              id: 'show_inactive',
              defaultMessage: 'Show Inactive',
            })}
            toggleState={includeInactive}
            onToggle={setIncludeInactive}
          />
        </ListHeader>

        <CountryList countries={countries} onRemoveCountry={onRemoveCountry} />

        <ListPagination
          isLoading={loading}
          onLoadMore={loadMore}
          data={countries}
          total={countriesCount}
          onLimitChange={setLimit}
        />
      </div>
    </>
  );
};

export default Country;

import { useState } from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CountryList from '../../modules/country/component/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';

const Country = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const { formatMessage } = useIntl();
  const [includeInactive, setIncludeInactive] = useState(false);
  const { countries, countriesCount, loadMore } = useCountries({
    limit,
    includeInactive,
  });
  const { removeCountry } = useRemoveCountry();
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'countries',
          defaultMessage: 'Countries',
        })}
      />
      <CountryList
        countries={countries}
        onLoadMore={loadMore}
        onLimitChange={setLimit}
        total={countriesCount}
        onRemoveCountry={removeCountry}
        onIncludeInactiveChange={setIncludeInactive}
        includeInactive={includeInactive}
      />
    </>
  );
};

export default Country;

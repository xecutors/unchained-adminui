import { useState } from 'react';

import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CountryList from '../../modules/country/component/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';

const Country = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeInactive, setIncludeInactive] = useState(false);
  const { countries, countriesCount, loadMore } = useCountries({
    limit,
    includeInactive,
  });
  const { removeCountry } = useRemoveCountry();

  return (
    <CountryList
      countries={countries}
      onLoadMore={loadMore}
      onLimitChange={setLimit}
      total={countriesCount}
      onRemoveCountry={removeCountry}
      onIncludeInactiveChange={setIncludeInactive}
      includeInactive={includeInactive}
    />
  );
};

export default Country;

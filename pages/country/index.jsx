import { useState } from 'react';
import Layout from '../../modules/common/components/Layout';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CountryList from '../../modules/country/component/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';

const Country = ({ ...pageProps }) => {
  const [limit, setLimit] = useState(DefaultLimit);
  const { countries, countriesCount, loadMore } = useCountries({
    limit,
  });
  const { removeCountry } = useRemoveCountry();

  return (
    <Layout {...pageProps}>
      <CountryList
        countries={countries}
        onLoadMore={loadMore}
        onLimitChange={setLimit}
        total={countriesCount}
        onRemoveCountry={removeCountry}
      />
    </Layout>
  );
};

export default Country;

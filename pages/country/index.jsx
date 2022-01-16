import { useState } from 'react';
import { useIntl } from 'react-intl';
import Layout from '../../modules/common/components/Layout';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import CountryList from '../../modules/country/component/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';

const Country = ({ ...pageProps }) => {
  const { formatMessage } = useIntl();
  const [limit, setLimit] = useState(DefaultLimit);
  const [includeInactive, setIncludeInactive] = useState(false);
  const { countries, countriesCount, loadMore } = useCountries({
    limit,
    includeInactive,
  });
  const { removeCountry } = useRemoveCountry();

  return (
    <Layout
      {...pageProps}
      pageHeader={formatMessage({
        id: 'countries',
        defaultMessage: 'Countries',
      })}
    >
      <CountryList
        countries={countries}
        onLoadMore={loadMore}
        onLimitChange={setLimit}
        total={countriesCount}
        onRemoveCountry={removeCountry}
        onIncludeInactiveChange={setIncludeInactive}
        includeInactive={includeInactive}
      />
    </Layout>
  );
};

export default Country;

import Layout from '../../modules/common/components/Layout';
import CountryList from '../../modules/country/component/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';

const Country = ({ ...pageProps }) => {
  const { countries } = useCountries({ limit: 20 });
  const { removeCountry } = useRemoveCountry();
  return (
    <Layout {...pageProps}>
      <CountryList countries={countries} onRemoveCountry={removeCountry} />
    </Layout>
  );
};

export default Country;

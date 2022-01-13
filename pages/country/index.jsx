import Layout from '../../modules/common/components/Layout';
import CountryList from '../../modules/country/country/component/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

const Country = ({ ...pageProps }) => {
  const { countries } = useCountries({ limit: 20 });
  return (
    <Layout {...pageProps}>
      <CountryList countries={countries} />
    </Layout>
  );
};

export default Country;

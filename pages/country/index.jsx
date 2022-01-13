import Layout from '../../modules/common/components/Layout';
import CountryList from '../../modules/country/country/component/CountryList';
import useCountries from '../../modules/country/hooks/useCountries';

const Country = () => {
  const { countries } = useCountries({ limit: 20 });
  return (
    <Layout>
      <CountryList countries={countries} />
    </Layout>
  );
};

export default Country;

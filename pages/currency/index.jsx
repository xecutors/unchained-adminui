import Layout from '../../modules/common/components/Layout';
import CurrencyList from '../../modules/currency/currency/component/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';

const Currencies = ({ ...pageProps }) => {
  const { currencies } = useCurrencies({ limit: 20 });

  return (
    <Layout {...pageProps}>
      <CurrencyList currencies={currencies} />
    </Layout>
  );
};

export default Currencies;

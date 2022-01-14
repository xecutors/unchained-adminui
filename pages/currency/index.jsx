import Layout from '../../modules/common/components/Layout';
import CurrencyList from '../../modules/currency/component/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';

const Currencies = ({ ...pageProps }) => {
  const { currencies } = useCurrencies({ limit: 20 });
  const { removeCurrency } = useRemoveCurrency();

  return (
    <Layout {...pageProps}>
      <CurrencyList currencies={currencies} onRemoveCurrency={removeCurrency} />
    </Layout>
  );
};

export default Currencies;

import Layout from '../../modules/common/components/Layout';
import CurrencyList from '../../modules/currency/currency/component/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';

const Currencies = () => {
  const { currencies } = useCurrencies({ limit: 20 });

  return (
    <Layout>
      <CurrencyList currencies={currencies} />
    </Layout>
  );
};

export default Currencies;

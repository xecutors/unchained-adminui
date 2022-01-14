import Layout from '../../modules/common/components/Layout';
import CurrencyList from '../../modules/currency/component/CurrencyList';
import useCurrencies from '../../modules/currency/hooks/useCurrencies';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';

const Currencies = ({ ...pageProps }) => {
  const { currencies } = useCurrencies({ limit: 20 });
  const { removeCurrency } = useRemoveCurrency();
  const onRemove = async (currencyId) => {
    await removeCurrency({ currencyId });
  };
  return (
    <Layout {...pageProps}>
      <CurrencyList currencies={currencies} onRemoveCurrency={onRemove} />
    </Layout>
  );
};

export default Currencies;

import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';
import CurrencyForm from '../../modules/currency/component/CurrencyForm';
import useCurrency from '../../modules/currency/hooks/useCurrency';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';
import useUpdateCurrency from '../../modules/currency/hooks/useUpdateCountry';

const UpdateCurrency = ({ ...pageProps }) => {
  const { push, query } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  const { currency } = useCurrency({ currencyId: id });
  const { updateCurrency } = useUpdateCurrency();
  const { removeCurrency } = useRemoveCurrency();
  const onSubmit = async ({ isActive, isoCode }) => {
    await updateCurrency({ currencyId: id, isActive, isoCode });
    return true;
  };

  const onRemove = async () => {
    await removeCurrency({ currencyId: id });
    push('/currency');
  };

  const onSubmitSuccess = () => {
    push('/currency');
  };
  return (
    <Layout {...pageProps}>
      <div className="m-10  bg-white shadow-md rounded px-10 pt-8 pb-10 mb-8 ">
        <FormHeader
          headerText={formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
          onDelete={onRemove}
        />
        <CurrencyForm
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
          defaultValue={currency}
        />
      </div>
    </Layout>
  );
};

export default UpdateCurrency;

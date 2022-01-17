import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';
import CurrencyForm from '../../modules/currency/component/CurrencyForm';
import useCreateCurrency from '../../modules/currency/hooks/useCreateCurrency';

const AddCurrency = ({ ...pageProps }) => {
  const { createCurrency } = useCreateCurrency();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const onSubmitSuccess = () => {
    router.push('/currency');
  };

  const onSubmit = async ({ isoCode }) => {
    await createCurrency({ isoCode });
    return true;
  };
  return (
    <Layout {...pageProps}>
      <div className="mt-6  sm:max-w-lg">
        <div className="bg-white py-12 px-10 shadow sm:rounded-lg sm:px-15">
          <FormHeader
            headerText={formatMessage({ id: 'new', defaultMessage: 'New' })}
          />
          <CurrencyForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
        </div>
      </div>
    </Layout>
  );
};

export default AddCurrency;

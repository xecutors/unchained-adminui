import { useRouter } from 'next/router';
import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';
import CurrencyForm from '../../modules/currency/component/CurrencyForm';
import useCreateCurrency from '../../modules/currency/hooks/useCreateCurrency';

const AddCurrency = ({ ...pageProps }) => {
  const { createCurrency } = useCreateCurrency();
  const router = useRouter();

  const onSubmitSuccess = () => {
    router.push('/currency');
  };

  const onDelete = async () => {
    // await removeCurrency('idsss');
  };

  const onSubmit = async ({ isoCode }) => {
    await createCurrency({ isoCode });
    return true;
  };
  return (
    <Layout {...pageProps}>
      <div className="m-10  bg-white shadow-md rounded px-10 pt-8 pb-10 mb-8 ">
        <FormHeader headerText="New" onDelete={onDelete} />
        <CurrencyForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
      </div>
    </Layout>
  );
};

export default AddCurrency;

import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';
import PaymentForm from '../../modules/payment-providers/componet/PaymentForm';
import usePaymentProvider from '../../modules/payment-providers/hooks/usePaymentProvider';

const Addpayment = ({ ...pageProps }) => {
  const { formatMessage } = useIntl();

  const onSubmit = async ({}) => {
    await createPayment({});
    return true;
  };
  return (
    <Layout {...pageProps}>
      <div className="m-10   bg-white shadow-md rounded px-10 pt-8 pb-10 mb-8 ">
        <FormHeader
          headerText={formatMessage({ id: 'new', defaultMessage: 'New' })}
        />
        <PaymentForm />
      </div>
    </Layout>
  );
};

export default Addpayment;

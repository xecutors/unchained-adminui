import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import CurrencyForm from '../../modules/currency/components/CurrencyForm';
import useCreateCurrency from '../../modules/currency/hooks/useCreateCurrency';

const AddCurrency = () => {
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
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_currency_header',
          defaultMessage: 'New currency',
        })}
      />
      <div className="mt-6  sm:max-w-xl">
        <FormHeader
          headerText={formatMessage({ id: 'new', defaultMessage: 'New' })}
        >
          <CurrencyForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
        </FormHeader>
      </div>
    </>
  );
};

export default AddCurrency;

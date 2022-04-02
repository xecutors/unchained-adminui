import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormWrapper from '../../modules/common/components/FormWrapper';
import PageHeader from '../../modules/common/components/PageHeader';
import CurrencyForm from '../../modules/currency/components/CurrencyForm';
import useCreateCurrency from '../../modules/currency/hooks/useCreateCurrency';

const AddCurrency = () => {
  const { createCurrency } = useCreateCurrency();
  const router = useRouter();
  const { formatMessage } = useIntl();
  const onSubmitSuccess = ({_id}) => {
    router.push(`/currency/${_id}`);
 
  };

  const onSubmit = async ({ isoCode }) => {
    const { data }=await createCurrency({ isoCode });
    return { success: true, data: data?.createCurrency };
  };
  return (
    <>
      <BreadCrumbs />
      <div className="mx-auto sm:max-w-2xl">
        <PageHeader
          headerText={formatMessage({
            id: 'new_currency_header',
            defaultMessage: 'New currency',
          })}
        />
        <div className="mx-auto mt-6 sm:max-w-xl">
          <FormWrapper>
            <CurrencyForm
              onSubmit={onSubmit}
              onSubmitSuccess={onSubmitSuccess}
            />
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default AddCurrency;

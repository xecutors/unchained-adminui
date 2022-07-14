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
  const onSubmitSuccess = (_, { _id }) => {
    router.push(`/currency/${_id}`);
  };

  const onSubmit = async ({ isoCode, contractAddress }) => {
    const { data, errors } = await createCurrency({ isoCode, contractAddress });
    if (errors?.length) return false;
    return { success: true, data: data?.createCurrency };
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
      <div className="mt-6 lg:grid lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-2">
          <div className="-my-5 divide-y divide-slate-200 dark:divide-slate-700 mr-2 dark:text-slate-400 mr-4">
            {formatMessage({
              id: 'currency_contract_address_description',
              defaultMessage:
                'Contract address is optional and represents address of the 40 character long deployed token contract on the ethereum network. ',
            })}
          </div>
        </div>

        <div className="lg:col-span-2">
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

import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import FormHeader from '../../modules/common/components/FormHeader';
import CurrencyForm from '../../modules/currency/components/CurrencyForm';
import useCurrency from '../../modules/currency/hooks/useCurrency';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';
import useUpdateCurrency from '../../modules/currency/hooks/useUpdateCountry';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

const UpdateCurrency = () => {
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
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'update_currency_header',
          defaultMessage: 'Update currency',
        })}
      />
      <div className="mt-6  sm:max-w-xl">
        <FormHeader onDelete={onRemove}>
          <CurrencyForm
            onSubmit={onSubmit}
            onSubmitSuccess={onSubmitSuccess}
            defaultValue={currency}
            isEdit
          />
        </FormHeader>
      </div>
    </>
  );
};

export default UpdateCurrency;

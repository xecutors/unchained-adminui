import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import FormHeader from '../../modules/common/components/FormHeader';
import CurrencyForm from '../../modules/currency/components/CurrencyForm';
import useCurrency from '../../modules/currency/hooks/useCurrency';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';
import useUpdateCurrency from '../../modules/currency/hooks/useUpdateCountry';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import useModal from '../../modules/modal/hooks/useModal';
import DangerMessage from '../../modules/modal/components/DangerMessage';

const UpdateCurrency = () => {
  const { push, query } = useRouter();
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { currencyId } = query;
  const { currency } = useCurrency({ currencyId });
  const { updateCurrency } = useUpdateCurrency();
  const { removeCurrency } = useRemoveCurrency();
  const onSubmit = async ({ isActive, isoCode }) => {
    await updateCurrency({ currencyId, isActive, isoCode });
    return true;
  };

  const onSubmitSuccess = () => {
    push('/currency');
  };

  const onDelete = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this payment provider? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeCurrency({ currencyId });
          toast.success(
            formatMessage(
              {
                id: 'currency_deleted',
                defaultMessage: 'Currency {currencyId} deleted successfully',
              },
              {
                currencyId,
              },
            ),
          );
          push('/currency');
        }}
        okText={formatMessage({
          id: 'delete_currency',
          defaultMessage: 'Delete currency',
        })}
      />,
    );
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
        <FormHeader onDelete={onDelete}>
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

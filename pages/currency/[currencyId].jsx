import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import FormWrapper from '../../modules/common/components/FormWrapper';
import CurrencyForm from '../../modules/currency/components/CurrencyForm';
import useCurrency from '../../modules/currency/hooks/useCurrency';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';
import useUpdateCurrency from '../../modules/currency/hooks/useUpdateCountry';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import useModal from '../../modules/modal/hooks/useModal';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';

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
      <div className="flex align-center justify-between min-w-full">
        <PageHeader
          headerText={formatMessage({
            id: 'update_currency_header',
            defaultMessage: 'Update currency',
          })}
        />
        <HeaderDeleteButton onClick={onDelete} />
      </div>
      <div className="mt-6  sm:max-w-xl">
        <FormWrapper>
          <CurrencyForm
            onSubmit={onSubmit}
            onSubmitSuccess={onSubmitSuccess}
            defaultValue={currency}
            isEdit
          />
        </FormWrapper>
      </div>
    </>
  );
};

export default UpdateCurrency;

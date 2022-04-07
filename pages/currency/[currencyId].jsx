import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import FormWrapper from '../../modules/common/components/FormWrapper';
import CurrencyForm from '../../modules/currency/components/CurrencyForm';
import useCurrency, {
  preFetchCurrency,
} from '../../modules/currency/hooks/useCurrency';
import useRemoveCurrency from '../../modules/currency/hooks/useRemoveCurrency';
import useUpdateCurrency from '../../modules/currency/hooks/useUpdateCurrency';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import useModal from '../../modules/modal/hooks/useModal';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import Loading from '../../modules/common/components/Loading';
import { normalizeCurrencyISOCode } from '../../modules/common/utils/utils';
import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';
import {
  addApolloState,
  initializeApollo,
} from '../../modules/apollo/apolloClient';

const UpdateCurrency = () => {
  const { push, query } = useRouter();
  const { formatMessage, locale } = useIntl();
  const { hasRole } = useAuth();
  const { setModal } = useModal();
  const { currencyId } = query;
  const { currency, loading } = useCurrency({ currencyId });
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
          id: 'delete_currency_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this currency? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeCurrency({ currencyId });
          toast.success(
            formatMessage({
              id: 'currency_deleted',
              defaultMessage: 'Currency deleted successfully',
            }),
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
      <BreadCrumbs
        currentPageTitle={normalizeCurrencyISOCode(locale, currency?.isoCode)}
      />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={normalizeCurrencyISOCode(locale, currency?.isoCode)}
        />
        {hasRole(ACTION_ROLES.currencies.delete) && (
          <HeaderDeleteButton onClick={onDelete} />
        )}
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto mt-6 sm:max-w-xl">
          <FormWrapper>
            <CurrencyForm
              onSubmit={onSubmit}
              onSubmitSuccess={onSubmitSuccess}
              defaultValue={currency}
              isEdit
            />
          </FormWrapper>
        </div>
      )}
    </>
  );
};

export async function getStaticProps({ params, locale }) {
  const apolloClient = await initializeApollo(null, { locale });

  const { currencyId } = params;
  const currency = await preFetchCurrency(apolloClient, { locale, currencyId });
  if (!currency)
    return {
      notFound: true,
    };

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 60,
  });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export default UpdateCurrency;

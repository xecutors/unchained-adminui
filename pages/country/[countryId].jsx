import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import FormWrapper from '../../modules/common/components/FormWrapper';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

import CountryForm from '../../modules/country/components/CountryForm';
import useCountry from '../../modules/country/hooks/useCountry';
import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';
import useUpdateCountry from '../../modules/country/hooks/useUpdateCountry';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import Loading from '../../modules/common/components/Loading';
import { normalizeCountryISOCode } from '../../modules/common/utils/utils';
import ACTION_ROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';

const normalizeCountry = (country) => {
  return {
    isActive: country?.isActive,
    isoCode: country?.isoCode,
    defaultCurrencyId: country?.defaultCurrency?._id,
  };
};

const UpdateCountry = () => {
  const { push, query } = useRouter();
  const { countryId } = query;
  const { formatMessage, locale } = useIntl();
  const { setModal } = useModal();
  const { hasRole } = useAuth();

  const { country, loading } = useCountry({ countryId });
  const { updateCountry } = useUpdateCountry();
  const { removeCountry } = useRemoveCountry();

  const onSubmit = async ({ isActive, isoCode, defaultCurrencyId }) => {
    await updateCountry({
      countryId,
      isActive,
      isoCode,
      defaultCurrencyId,
    });

    return true;
  };

  const onSubmitSuccess = () => {
    push('/country');
  };

  const onDelete = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_country_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this country? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeCountry({ countryId });
          toast.success(
            formatMessage({
              id: 'country_deleted',
              defaultMessage: 'Country deleted successfully',
            }),
          );
          push('/country');
        }}
        okText={formatMessage({
          id: 'delete_country',
          defaultMessage: 'Delete country',
        })}
      />,
    );
  };

  return (
    <>
      <BreadCrumbs
        currentPageTitle={normalizeCountryISOCode(locale, country?.isoCode)}
      />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={normalizeCountryISOCode(locale, country?.isoCode)}
        />
        {hasRole(ACTION_ROLES.country.delete) && (
          <HeaderDeleteButton onClick={onDelete} />
        )}
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto mt-6 sm:max-w-xl">
          <FormWrapper>
            <CountryForm
              isEdit
              defaultValue={normalizeCountry(country)}
              onSubmitSuccess={onSubmitSuccess}
              onSubmit={onSubmit}
            />
          </FormWrapper>
        </div>
      )}
    </>
  );
};

export default UpdateCountry;

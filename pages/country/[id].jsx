import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';
import CountryForm from '../../modules/country/component/CountryForm';
import useCountry from '../../modules/country/hooks/useCountry';
import useRemoveCountry from '../../modules/country/hooks/useRemoveCountry';
import useUpdateCountry from '../../modules/country/hooks/useUpdateCountry';

const normalizeCountry = (country) => {
  return {
    isActive: country?.isActive,
    isoCode: country?.isoCode,
    defaultCurrencyId: country?.defaultCurrency?._id,
  };
};

const UpdateCountry = ({ ...pageProps }) => {
  const { push, query } = useRouter();
  const { id } = query;

  const { country } = useCountry({ countryId: id });
  const { updateCountry } = useUpdateCountry();
  const { removeCountry } = useRemoveCountry();

  const onSubmit = async ({ isActive, isoCode, defaultCurrencyId }) => {
    await updateCountry({
      countryId: id,
      isActive,
      isoCode,
      defaultCurrencyId,
    });

    return true;
  };

  const onSubmitSuccess = () => {
    push('/country');
  };
  const { formatMessage } = useIntl();
  return (
    <Layout {...pageProps}>
      <FormHeader
        headerText={formatMessage({ id: 'Edit', defaultMessage: 'Edit' })}
        onDelete={removeCountry}
      />
      <CountryForm
        defaultValue={normalizeCountry(country)}
        onSubmitSuccess={onSubmitSuccess}
        onSubmit={onSubmit}
      />
    </Layout>
  );
};

export default UpdateCountry;

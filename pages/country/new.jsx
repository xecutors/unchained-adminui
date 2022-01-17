import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';
import CountryForm from '../../modules/country/component/CountryForm';
import useCreateCountry from '../../modules/country/hooks/useCreateCountry';

const AddCountries = ({ ...pageProps }) => {
  const { formatMessage } = useIntl();
  const { push } = useRouter();
  const { createCountry } = useCreateCountry();
  const onCreateCountry = async ({ isoCode }) => {
    await createCountry({ isoCode });
    return true;
  };

  const onSubmitSuccess = () => {
    push('/country');
  };

  return (
    <Layout {...pageProps}>
      <div className="mt-6  sm:max-w-lg">
        <div className="bg-white py-12 px-10 shadow sm:rounded-lg sm:px-15">
          <FormHeader
            headerText={formatMessage({ id: 'new', defaultMessage: 'New' })}
          />
          <CountryForm
            onSubmitSuccess={onSubmitSuccess}
            onSubmit={onCreateCountry}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddCountries;

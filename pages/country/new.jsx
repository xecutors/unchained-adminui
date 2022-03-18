import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormWrapper from '../../modules/common/components/FormWrapper';
import PageHeader from '../../modules/common/components/PageHeader';
import CountryForm from '../../modules/country/components/CountryForm';
import useCreateCountry from '../../modules/country/hooks/useCreateCountry';

const AddCountries = () => {
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
    <>
      <BreadCrumbs />
      <div className="sm:max-w-2xl mx-auto">
        <PageHeader
          headerText={formatMessage({
            id: 'new_country_header',
            defaultMessage: 'New country',
          })}
        />
        <div className="mt-6  sm:max-w-xl">
          <FormWrapper>
            <CountryForm
              onSubmitSuccess={onSubmitSuccess}
              onSubmit={onCreateCountry}
            />
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default AddCountries;

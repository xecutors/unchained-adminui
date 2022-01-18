import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import FormHeader from '../../modules/common/components/FormHeader';

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

const UpdateCountry = () => {
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
    <div className=" min-w-0 flex-1 sm:max-w-lg">
        <div className=" mb-3 mt-10 bg-white px-10 shadow sm:rounded-b sm:px-15">
      <FormHeader
        headerText={formatMessage({ id: 'Edit', defaultMessage: 'Edit' })}
        onDelete={removeCountry}
      />
      <CountryForm
        isEdit
        defaultValue={normalizeCountry(country)}
        onSubmitSuccess={onSubmitSuccess}
        onSubmit={onSubmit}
      />
</div>
</div>
  );
};

export default UpdateCountry;

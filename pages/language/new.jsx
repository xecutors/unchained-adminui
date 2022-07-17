import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormWrapper from '../../modules/common/components/FormWrapper';
import PageHeader from '../../modules/common/components/PageHeader';

import LanguageForm from '../../modules/language/components/LanguageForm';
import useCreateLanguage from '../../modules/language/hooks/useCreateLanguage';

const AddLanguage = () => {
  const { createLanguage } = useCreateLanguage();
  const { formatMessage } = useIntl();
  const router = useRouter();

  const onSubmitSuccess = (_, { _id }) => {
    router.push(`/language/${_id}`);
  };

  const onSubmit = async ({ isoCode }) => {
    const { data, errors } = await createLanguage({ isoCode });
    if (errors?.length) return false;
    return { success: true, data: data?.createLanguage };
  };

  return (
    <>
      <BreadCrumbs />
      <div className="mx-auto sm:max-w-2xl">
        <PageHeader
          headerText={formatMessage({
            id: 'new_language_header',
            defaultMessage: 'New language',
          })}
        />

        <FormWrapper>
          <LanguageForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
        </FormWrapper>
      </div>
    </>
  );
};

export default AddLanguage;

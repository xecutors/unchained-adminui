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

  const onSubmitSuccess = () => {
    router.push('/language');
  };

  const onSubmit = async ({ isoCode }) => {
    await createLanguage({ isoCode });
    return true;
  };

  return (
    <>
      <BreadCrumbs />
      <div className="sm:max-w-2xl mx-auto">
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

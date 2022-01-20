import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import FormHeader from '../../modules/common/components/FormHeader';
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
    <div className="mt-6  sm:max-w-lg">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_language_header',
          defaultMessage: 'New language',
        })}
      />
      <FormHeader>
        <LanguageForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
      </FormHeader>
    </div>
  );
};

export default AddLanguage;

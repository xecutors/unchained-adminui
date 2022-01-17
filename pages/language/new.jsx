import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';

import LanguageForm from '../../modules/language/components/LanguageForm';
import useCreateLanguage from '../../modules/language/hooks/useCreateLanguage';

const AddLanguage = ({ ...pageProps }) => {
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
    <Layout {...pageProps}>
      <div className="mt-6  sm:max-w-lg">
        <div className="bg-white py-12 px-10 shadow sm:rounded-lg sm:px-15">
          <FormHeader
            headerText={formatMessage({ id: 'new', defaultMessage: 'New' })}
          />
          <LanguageForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
        </div>
      </div>
    </Layout>
  );
};

export default AddLanguage;

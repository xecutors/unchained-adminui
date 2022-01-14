import { useRouter } from 'next/router';
import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';

import LanguageForm from '../../modules/language/components/LanguageForm';
import useCreateLanguage from '../../modules/language/hooks/useCreateLanguage';

const AddLanguage = ({ ...pageProps }) => {
  const { createLanguage } = useCreateLanguage();
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
      <div className="m-10  bg-white shadow-md rounded px-10  ">
        <FormHeader headerText="New" />
        <LanguageForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
      </div>
    </Layout>
  );
};

export default AddLanguage;

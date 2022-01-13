import { useRouter } from 'next/router';
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
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                New
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <button
                type="button"
                className="mt-3 ml-2 mr-2  items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Language
              </button>
            </div>
          </div>
        </div>
        <LanguageForm onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess} />
      </div>
    </Layout>
  );
};

export default AddLanguage;

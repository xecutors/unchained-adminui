import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import FormHeader from '../../modules/common/components/FormHeader';
import Layout from '../../modules/common/components/Layout';

import LanguageForm from '../../modules/language/components/LanguageForm';
import useLanguage from '../../modules/language/hooks/useLanguage';
import useRemoveLanguage from '../../modules/language/hooks/useRemoveLanguage';
import useUpdateLanguage from '../../modules/language/hooks/useUpdateLanguage';

const UpdateLanguage = ({ ...pageProps }) => {
  const { updateLanguage } = useUpdateLanguage();
  const { push, query } = useRouter();
  const { id } = query;

  const { language } = useLanguage({ languageId: id });

  const onSubmitSuccess = () => {
    push('/language');
  };
  const { formatMessage } = useIntl();

  const { removeLanguage } = useRemoveLanguage();
  const onDelete = async () => {
    await removeLanguage(id);
  };

  const onSubmit = async ({ isoCode, isActive }) => {
    await updateLanguage({ isoCode, isActive, languageId: id });
    return true;
  };

  return (
    <Layout {...pageProps}>
      <div className="m-10  bg-white shadow-md rounded px-10  ">
        <FormHeader
          headerText={formatMessage({ id: 'edit', defaultMessage: 'Edit' })}
          onDelete={onDelete}
        />
        <LanguageForm
          isEdit
          defaultValue={language}
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
    </Layout>
  );
};

export default UpdateLanguage;

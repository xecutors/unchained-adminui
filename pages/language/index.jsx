import Layout from '../../modules/common/components/Layout';
import useLanguages from '../../modules/language/hooks/useLanguages';
import LanguageList from '../../modules/language/components/LanguageList';
import useRemoveLanguage from '../../modules/language/hooks/useRemoveLanguage';

const Languages = () => {
  const { languages } = useLanguages({ limit: 20 });

  const { removeLanguage } = useRemoveLanguage();

  const onRemoveLanguage = async (languageId) => {
    await removeLanguage({ languageId });
  };
  return (
    <Layout>
      <LanguageList languages={languages} onRemove={onRemoveLanguage} />
    </Layout>
  );
};

export default Languages;

import Layout from '../../modules/common/components/Layout';
import useLanguages from '../../modules/language/hooks/useLanguages';
import LanguageList from '../../modules/language/language/component/LanguageList';

const Languages = () => {
  const { languages } = useLanguages({ limit: 20 });
  return (
    <Layout>
      <LanguageList languages={languages} />
    </Layout>
  );
};

export default Languages;

import { useState } from 'react';
import Layout from '../../modules/common/components/Layout';
import useLanguages from '../../modules/language/hooks/useLanguages';
import LanguageList from '../../modules/language/components/LanguageList';
import useRemoveLanguage from '../../modules/language/hooks/useRemoveLanguage';
import useLanguagesCount from '../../modules/language/hooks/useLanguagesCount';

const Languages = ({ ...pageProps }) => {
  const [limit, setLimit] = useState(20);

  const { languages, loadMore } = useLanguages({ limit });
  const { languagesCount } = useLanguagesCount();
  const { removeLanguage } = useRemoveLanguage();

  const onRemoveLanguage = async (languageId) => {
    await removeLanguage({ languageId });
  };

  return (
    <Layout {...pageProps}>
      <LanguageList
        languages={languages}
        onRemove={onRemoveLanguage}
        total={languagesCount}
        onLimitChange={setLimit}
        onLoadMore={loadMore}
      />
    </Layout>
  );
};

export default Languages;

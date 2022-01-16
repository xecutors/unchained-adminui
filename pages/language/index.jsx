import { useState } from 'react';
import { useIntl } from 'react-intl';
import Layout from '../../modules/common/components/Layout';
import useLanguages from '../../modules/language/hooks/useLanguages';
import LanguageList from '../../modules/language/components/LanguageList';
import useRemoveLanguage from '../../modules/language/hooks/useRemoveLanguage';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';

const Languages = ({ ...pageProps }) => {
  const [limit, setLimit] = useState(DefaultLimit);
  const { formatMessage } = useIntl();
  const [includeInactive, setIncludeInactive] = useState(false);

  const { languages, languagesCount, loadMore } = useLanguages({
    limit,
    includeInactive,
  });
  const { removeLanguage } = useRemoveLanguage();

  const onRemoveLanguage = async (languageId) => {
    await removeLanguage({ languageId });
  };

  return (
    <Layout
      {...pageProps}
      pageHeader={formatMessage({
        id: 'languages',
        defaultMessage: 'Languages',
      })}
    >
      <LanguageList
        languages={languages}
        onRemove={onRemoveLanguage}
        total={languagesCount}
        onLimitChange={setLimit}
        onLoadMore={loadMore}
        onIncludeInactiveChange={setIncludeInactive}
        includeInactive={includeInactive}
      />
    </Layout>
  );
};

export default Languages;

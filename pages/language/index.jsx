import { useState } from 'react';

import { useIntl } from 'react-intl';
import useLanguages from '../../modules/language/hooks/useLanguages';
import LanguageList from '../../modules/language/components/LanguageList';
import useRemoveLanguage from '../../modules/language/hooks/useRemoveLanguage';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import PageHeaders from '../../modules/common/components/PageHeader';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

const Languages = () => {
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
    <>
      <BreadCrumbs />
      <PageHeaders
        headerText={formatMessage({
          id: 'language_header',
          defaultMessage: 'Languages',
        })}
      />
      <LanguageList
        languages={languages}
        onRemove={onRemoveLanguage}
        total={languagesCount}
        onLimitChange={setLimit}
        onLoadMore={loadMore}
        onIncludeInactiveChange={setIncludeInactive}
        includeInactive={includeInactive}
      />
    </>
  );
};

export default Languages;

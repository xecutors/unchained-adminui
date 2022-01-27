import { useState } from 'react';

import { useIntl } from 'react-intl';
import useLanguages from '../../modules/language/hooks/useLanguages';
import LanguageList from '../../modules/language/components/LanguageList';
import useRemoveLanguage from '../../modules/language/hooks/useRemoveLanguage';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import PageHeaders from '../../modules/common/components/PageHeader';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Toggle from '../../modules/common/components/Toggle';
import ListPagination from '../../modules/common/components/ListPagination';

const Languages = () => {
  const [limit, setLimit] = useState(DefaultLimit);
  const { formatMessage } = useIntl();

  const [includeInactive, setIncludeInactive] = useState(false);

  const { languages, languagesCount, loadMore, loading } = useLanguages({
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

      <div className="min-w-full  sm:shadow-lg   shadow overflow-hidden border-b border-gray-200  ">
        <ListHeader addPath="/language/new">
          <Toggle
            toggleText={formatMessage({
              id: 'show_inactive',
              defaultMessage: 'Show Inactive',
            })}
            toggleState={includeInactive}
            onToggle={setIncludeInactive}
          />
        </ListHeader>
        <LanguageList
          languages={languages}
          onRemoveLanguage={onRemoveLanguage}
        />
        <ListPagination
          isLoading={loading}
          onLoadMore={loadMore}
          data={languages}
          total={languagesCount}
          onLimitChange={setLimit}
        />
      </div>
    </>
  );
};

export default Languages;

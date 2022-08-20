import React from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import useLanguages from '../../modules/language/hooks/useLanguages';
import LanguageList from '../../modules/language/components/LanguageList';
import useRemoveLanguage from '../../modules/language/hooks/useRemoveLanguage';
import { DefaultLimit } from '../../modules/common/data/miscellaneous';
import PageHeaders from '../../modules/common/components/PageHeader';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import ListHeader from '../../modules/common/components/ListHeader';
import Toggle from '../../modules/common/components/Toggle';
import Pagination from '../../modules/common/components/Pagination';
import useModal from '../../modules/modal/hooks/useModal';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import Loading from '../../modules/common/components/Loading';
import ACTIONROLES from '../../modules/common/data/roles';
import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import { getSortKeys, normalizeQuery } from '../../modules/common/utils/utils';

const Languages = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const { hasRole } = useAuth();
  const limit = parseInt(query?.limit, 10) || DefaultLimit;
  const offset = parseInt(query?.skip, 10) || 0;
  const includeInactive =
    query?.includeInactive === 'true' || !query?.includeInactive;
  const sort = query?.sort || '';

  const { queryString, ...restQuery } = query;

  const setQueryString = (searchString) => {
    if (searchString)
      push({
        query: normalizeQuery(restQuery, searchString, 'queryString'),
      });
    else
      push({
        query: normalizeQuery(restQuery),
      });
  };

  const sortKeys = getSortKeys(sort);

  const { languages, languagesCount, loading } = useLanguages({
    queryString,
    limit,
    includeInactive,
    offset,
    sort: sortKeys,
  });

  const { setModal } = useModal();
  const { removeLanguage } = useRemoveLanguage();

  const onRemoveLanguage = async (languageId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_language_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this language? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeLanguage({ languageId });
          toast.success(
            formatMessage({
              id: 'language_deleted',
              defaultMessage: 'Language deleted successfully',
            }),
          );
        }}
        okText={formatMessage({
          id: 'delete_language',
          defaultMessage: 'Delete language',
        })}
      />,
    );
  };

  const sortFields = {
    isoCode: formatMessage({
      id: 'iso_code',
      defaultMessage: 'ISO code',
    }),
    isActive: formatMessage({ id: 'active', defaultMessage: 'Active' }),
    isBase: formatMessage({ id: 'base', defaultMessage: 'Base' }),
  };

  return (
    <>
      <BreadCrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeaders
          headerText={formatMessage({
            id: 'language_header',
            defaultMessage: 'Languages',
          })}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>

      <div className="min-w-full overflow-x-auto">
        <ListHeader
          addPath={hasRole(ACTIONROLES.languages.create) && '/language/new'}
          sortFields={sortFields}
        >
          <Toggle
            toggleText={formatMessage({
              id: 'show_inactive',
              defaultMessage: 'Show Inactive',
            })}
            toggleKey="includeInactive"
            active={includeInactive}
          />
        </ListHeader>
        {loading ? (
          <Loading />
        ) : (
          <LanguageList
            languages={languages}
            onRemoveLanguage={onRemoveLanguage}
          />
        )}
        <Pagination data={languages} total={languagesCount} />
      </div>
    </>
  );
};

export default Languages;

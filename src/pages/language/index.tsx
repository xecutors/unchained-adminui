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
import InfiniteScroll from '../../modules/common/components/InfiniteScroll';
import useModal from '../../modules/modal/hooks/useModal';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import Loading from '../../modules/common/components/Loading';
import useAuth from '../../modules/Auth/useAuth';
import SearchField from '../../modules/common/components/SearchField';
import {
  convertSortFieldsToQueryFormat,
  normalizeQuery,
} from '../../modules/common/utils/utils';
import LocaleWrapper from '../../modules/common/components/LocaleWrapper';
import LanguageDetailPage from './LanguageDetailPage';

const Languages = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();
  const { hasRole } = useAuth();
  const limit = parseInt(query?.limit as string, 10) || DefaultLimit;
  const offset = parseInt(query?.skip as string, 10) || 0;
  const includeInactive =
    query?.includeInactive === 'true' || !query?.includeInactive;
  const sort = query?.sort || '';
  const { queryString, languageId, ...restQuery } = query;

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = restQuery;
    if (searchString) {
      push({
        query: normalizeQuery(withoutSkip, searchString, 'queryString'),
      });
    } else {
      push({
        query: normalizeQuery(restQuery),
      });
    }
  };

  const sortKeys = convertSortFieldsToQueryFormat(sort);

  const { languages, languagesCount, loading, loadMore, hasMore } = useLanguages({
    queryString: queryString as string,
    limit,
    includeInactive,
    offset,
    sort: sortKeys,
  });

  const { setModal } = useModal();
  const { removeLanguage } = useRemoveLanguage();

  if (languageId) return <LanguageDetailPage languageId={languageId} />;
  const onRemoveLanguage = async (languageId) => {
    await setModal(
      <DangerMessage
        onCancelClick={async () => setModal('')}
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

  return (
    <>
      <BreadCrumbs />
      <PageHeaders
        headerText={formatMessage(
          (languagesCount ?? 0) === 1
            ? { id: 'language_count_header_singular', defaultMessage: '1 Language' }
            : { id: 'languages_count_header', defaultMessage: '{count} Languages' },
          { count: languagesCount ?? 0 }
        )}
      />

      <div className="min-w-full overflow-x-auto">
        <ListHeader
          addPath={hasRole('addLanguage') && '/language/new'}
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
        <LocaleWrapper
          searchComponent={
            <SearchField
              defaultValue={queryString}
              onInputChange={setQueryString}
            />
          }
        >
          <InfiniteScroll
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
          >
            {loading && languages?.length === 0 ? (
              <Loading />
            ) : (
              <LanguageList
                sortable
                languages={languages}
                onRemoveLanguage={onRemoveLanguage}
              />
            )}
          </InfiniteScroll>
        </LocaleWrapper>
      </div>
    </>
  );
};

export default Languages;

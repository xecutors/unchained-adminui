import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import Loading from '../../modules/common/components/Loading';
import useTokens from '../../modules/token/hooks/useTokens';
import TokenList from '../../modules/token/components/TokenList';
import NoData from '../../modules/common/components/NoData';
import { useRouter } from 'next/router';
import ListHeader from '../../modules/common/components/ListHeader';
import SearchField from '../../modules/common/components/SearchField';

const TokensPage = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();

  const { queryString, ...rest } = query;

  const setQueryString = (searchString) => {
    const { skip, ...withoutSkip } = rest;
    if (searchString)
      push({
        query: {
          ...withoutSkip,
          queryString: searchString,
        },
      });
    else
      push({
        query: {
          ...rest,
        },
      });
  };
  const { tokens, loading, tokensCount } = useTokens({
    limit: 0,
    offset: 0,
    queryString: queryString as string,
  });

  return (
    <>
      <BreadCrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'tokens',
            defaultMessage: 'Tokens',
          })}
        />
        <SearchField
          defaultValue={queryString}
          onInputChange={setQueryString}
        />
      </div>
      <div className="mt-5 inline-block min-w-full overflow-x-auto">
        <ListHeader totalRecords={tokensCount} />
        {loading ? <Loading /> : <TokenList tokens={tokens} />}
        {!loading && !tokens?.length && (
          <NoData
            message={formatMessage({
              id: 'token',
              defaultMessage: 'Token',
            })}
          />
        )}
      </div>
    </>
  );
};

export default TokensPage;

import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import Loading from '../../modules/common/components/Loading';
import useTokens from '../../modules/token/hooks/useTokens';
import TokenList from '../../modules/token/components/TokenList';
import NoData from '../../modules/common/components/NoData';
import { useRouter } from 'next/router';
import ListHeader from '../../modules/common/components/ListHeader';
import SearchWithTags from '../../modules/common/components/SearchWithTags';
import TokenDetailPage from './TokenDetailPage';
import AnimatedCounter from '../../modules/common/components/AnimatedCounter';

const TokensPage = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();

  const { queryString, tokenId, ...rest } = query;

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

  if (tokenId) return <TokenDetailPage tokenId={tokenId} />;
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage(
          (tokensCount ?? 0) === 1
            ? { id: 'token_count_header_singular', defaultMessage: '1 Token' }
            : { id: 'tokens_count_header', defaultMessage: '{count} Tokens' },
          { count: <AnimatedCounter value={tokensCount ?? 0} /> },
        )}
      />
      <div className="mt-5 inline-block min-w-full overflow-x-auto px-1 pb-5">
        <ListHeader />

        <SearchWithTags
          onSearchChange={setQueryString}
          defaultSearchValue={queryString}
        >
          <>
            {loading ? <Loading /> : <TokenList tokens={tokens} />}
            {!loading && !tokens?.length && (
              <NoData
                message={formatMessage({
                  id: 'token',
                  defaultMessage: 'Token',
                })}
              />
            )}
          </>
        </SearchWithTags>
      </div>
    </>
  );
};

export default TokensPage;

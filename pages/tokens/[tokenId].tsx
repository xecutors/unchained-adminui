import { useRouter } from 'next/router';
import useToken from '../../modules/token/hooks/useToken';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import { useIntl } from 'react-intl';
import Loading from '../../modules/common/components/Loading';
import TokenDetail from '../../modules/token/components/TokenDetail';

const TokenDetailView = () => {
  const { query } = useRouter();
  const { formatMessage } = useIntl();
  const { tokenId } = query;
  const { token, loading } = useToken({ tokenId: tokenId as string });

  if (loading) return <Loading />;
  return (
    <>
      <BreadCrumbs
        currentPageTitle={formatMessage({
          id: 'token',
          defaultMessage: 'Token',
        })}
      />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage(
            {
              id: 'token-id',
              defaultMessage: 'Token ID {chainTokenId}',
            },
            { chainTokenId: token?.chainTokenId },
          )}
          title={formatMessage(
            {
              id: 'token-id',
              defaultMessage: 'Token ID {chainTokenId}',
            },
            { chainTokenId: token?.chainTokenId },
          )}
        />
      </div>
      <TokenDetail token={token} />
    </>
  );
};

export default TokenDetailView;

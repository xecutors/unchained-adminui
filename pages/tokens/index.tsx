import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import Loading from '../../modules/common/components/Loading';
import useTokens from '../../modules/token/hooks/useTokens';
import TokenList from '../../modules/token/components/TokenList';
import NoData from '../../modules/common/components/NoData';

const PaymentProviders = () => {
  const { formatMessage } = useIntl();

  const { tokens, loading } = useTokens({
    limit: 0,
    offset: 0,
  });

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'tokens',
          defaultMessage: 'Tokens',
        })}
      />
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
  );
};

export default PaymentProviders;

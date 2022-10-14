import { useIntl } from 'react-intl';
import Accordion from '../../common/components/Accordion';
import Badge from '../../common/components/Badge';
import Loading from '../../common/components/Loading';
import NoData from '../../common/components/NoData';
import ExportTokenForm from '../../product/components/ExportTokenForm';
import ProductListItem from '../../product/components/ProductListItem';
import useUserTokens from '../../product/hooks/useUserTokens';

const TokenHeader = ({ status, quantity, chainTokenId }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex item-center">
        <div className="mr-2">{chainTokenId}</div>
        <div className="flex items-center gap-4">
          <div className="rounded-full text-sm leading-5">{quantity}</div>
        </div>
      </div>

      <div className="mr-4 flex text-sm text-slate-500 dark:text-slate-300 sm:mt-0">
        <Badge dotted text={status} />
      </div>
    </div>
  );
};

const TokenBody = ({ product, walletAddress, chainId, _id }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="border border-slate-200 rounded-lg mt-2 overflow-hidden bg-white dark:bg-slate-600 text-slate-900 dark:text-white">
      <div className="py-5 sm:p-0">
        <dl className="divide-y divide-slate-300 px-7">
          <div className="py-4 sm:py-5">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {formatMessage({
                id: 'wallet-address',
                defaultMessage: 'Wallet address',
              })}
            </dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
              {walletAddress}
            </dd>
          </div>
          <div className="py-4 sm:py-5">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {formatMessage({
                id: 'chain',
                defaultMessage: 'Chain',
              })}
            </dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{chainId}</dd>
          </div>
          <div className="py-4 sm:py-5">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
              {formatMessage({ id: 'product', defaultMessage: 'Product' })}
            </dt>
            <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
              <ProductListItem product={product} />
            </dd>
          </div>
          <div className="py-4 sm:py-5">
            <ExportTokenForm tokenId={_id} />
          </div>
        </dl>
      </div>
    </div>
  );
};
const headerCSS =
  'inline-flex items-center justify-between w-full px-4 py-2 rounded-lg border border-slate-200 shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 ';

const UserTokens = ({ _id: userId }) => {
  const { tokens, loading } = useUserTokens({ userId });
  const { formatMessage } = useIntl();

  const accordionData = tokens?.map((token) => ({
    header: <TokenHeader {...token} />,
    body: <TokenBody {...token} />,
  }));
  if (loading) return <Loading />;
  return (
    <div className="space-y-4 mt-4">
      {accordionData?.length ? (
        <Accordion data={accordionData} headerCSS={headerCSS} />
      ) : (
        <NoData
          message={formatMessage({
            id: 'tokens',
            defaultMessage: 'Tokens',
          })}
        />
      )}
    </div>
  );
};

export default UserTokens;

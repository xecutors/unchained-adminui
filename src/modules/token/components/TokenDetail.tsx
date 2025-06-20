import Link from 'next/link';
import generateUniqueId from '../../common/utils/getUniqueId';
import ImageWithFallback from '../../common/components/ImageWithFallback';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import { useIntl } from 'react-intl';
import { TOKEN_STATUSES } from '../../common/data/miscellaneous';
import Badge from '../../common/components/Badge';
import useFormatDateTime from '../../common/utils/useFormatDateTime';
import DetailHeader from '../../common/components/DetailHeader';
import shortenAddress from '../../common/utils/shortAddress';
import { useFormatPrice } from '../../common/utils/utils';

const TokenDetail = ({ token }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const { formatPrice } = useFormatPrice();

  if (!token) return null;

  return (
    <div className="grid gap-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <Link
          href={`/products?slug=${generateUniqueId(token?.product)}`}
          className="block overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 hover:opacity-90"
        >
          <ImageWithFallback
            src={
              (token?.product?.media?.length &&
                token?.product.media[0].file?.url) ||
              '/no-image.jpg'
            }
            loader={defaultNextImageLoader}
            alt={formatMessage({
              id: 'product-image',
              defaultMessage: 'Product image',
            })}
            width={200}
            height={200}
            layout="responsive"
            className="h-full w-full object-cover"
          />
        </Link>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {token?.product?.texts?.title || 'Untitled Product'}
          </h3>
          <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-300">
            {formatPrice(token?.product?.simulatedPrice)}
          </p>
          <p className="mt-2 text-gray-700 dark:text-gray-400">
            {formatMessage({
              id: 'item_quantity',
              defaultMessage: 'Quantity:',
            })}{' '}
            <span className="font-bold">{token?.quantity}</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <span className="block font-medium text-gray-700 dark:text-gray-300">
            {formatMessage({ id: 'status', defaultMessage: 'Status' })}
          </span>
          <Badge
            text={
              token?.status === 'CENTRALIZED' ? 'Off-Chain 🏛' : 'On-Chain ⛓'
            }
            color={TOKEN_STATUSES[token.status]}
            square
          />
        </div>

        <div>
          <span className="block font-medium text-gray-700 dark:text-gray-300">
            {formatMessage({
              id: 'chain-token-id',
              defaultMessage: 'Chain Token ID',
            })}
            :
          </span>
          <p className="text-gray-900 dark:text-gray-100">
            {token?.chainTokenId}
          </p>
        </div>

        <div>
          <span className="block font-medium text-gray-700 dark:text-gray-300">
            {formatMessage({
              id: 'chain-id',
              defaultMessage: 'Chain ID {chainId}',
            })}
            :
          </span>
          <p className="text-gray-900 dark:text-gray-100">{token?.chainId}</p>
        </div>

        <div>
          <span className="block font-medium text-gray-700 dark:text-gray-300">
            {formatMessage({ id: 'order', defaultMessage: 'Order' })}:
          </span>
          <Link
            href={`/orders?orderId=${token.ercMetadata?.orderId}`}
            className="text-slate-800 dark:text-slate-700 hover:underline"
          >
            {token?.ercMetadata?.orderId}
          </Link>
        </div>

        <div>
          <span className="block font-medium text-gray-700 dark:text-gray-300">
            {formatMessage({
              id: 'invalidated',
              defaultMessage: 'Invalidated',
            })}
            :
          </span>
          <p className="text-gray-900 dark:text-gray-100">
            {token?.invalidatedDate
              ? formatDateTime(token.invalidatedDate)
              : formatMessage({ id: 'not-applicable', defaultMessage: 'N/A' })}
          </p>
        </div>

        {token?.walletAddress && (
          <div>
            <span className="block font-medium text-gray-700 dark:text-gray-300">
              {formatMessage(
                {
                  id: 'wallet-address',
                  defaultMessage: 'Wallet {walletAddress}',
                },
                {
                  walletAddress: shortenAddress(token?.walletAddress),
                },
              )}
            </span>
          </div>
        )}
      </div>

      <div className="pt-6">
        <DetailHeader user={token?.user} contact={token?.user?.lastContact} />
      </div>
    </div>
  );
};

export default TokenDetail;

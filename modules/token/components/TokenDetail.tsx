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
    <div className="grid grid-cols-1 gap-4">
      <div
        key={token?._id}
        className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
      >
        <Link
          href={`/products/${generateUniqueId(token?.product)}`}
          className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75"
        >
          <div>
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
              width={100}
              height={100}
              layout="responsive"
              className=" h-full w-full "
            />
          </div>
          <div className="pt-2">
            <h3 className="text-lg font-medium text-gray-900">
              {token?.product?.texts?.title}
            </h3>
            <p className="mt-2 text-base font-medium text-gray-900">
              {formatPrice(token?.product?.simulatedPrice)}
            </p>
            <div className="mt-2 text-base font-medium text-gray-900">
              {formatMessage({
                id: 'item_quantity',
                defaultMessage: 'Quantity:',
              })}
              <span className="ml-2 font-bold">{token?.quantity}</span>
            </div>
          </div>
        </Link>
      </div>

      <div>
        <span className="font-medium text-gray-700">
          {formatMessage({ id: 'status', defaultMessage: 'Status' })}
        </span>
        <p className="text-gray-900">
          <Badge
            text={
              token?.status === 'CENTRALIZED' ? 'Off-Chain 🏛' : 'On-Chain ⛓'
            }
            color={TOKEN_STATUSES[token.status]}
            square
          />
        </p>
      </div>

      <div className="text-gray-900">
        {formatMessage(
          {
            id: 'token-id',
            defaultMessage: 'Token ID {chainTokenId}',
          },
          { chainTokenId: token.chainTokenId },
        )}
      </div>
      <div className="text-gray-900">
        {formatMessage(
          {
            id: 'chain-id',
            defaultMessage: 'Chain ID {chainId}',
          },
          { chainId: token?.chainId },
        )}
      </div>
      <div>
        <span className="font-medium text-gray-700">Order ID:</span>
        <p className="text-gray-900">
          <div className="flex items-center text-sm">
            <Link
              href={`/orders/${token.ercMetadata?.orderId}`}
              className="font-medium text-blue-500 dark:text-blue-400"
            >
              {token?.ercMetadata?.orderId}
            </Link>
          </div>
        </p>
      </div>
      <div>
        <span className="font-medium text-gray-700">Invalidated:</span>
        <p className="text-gray-900">
          {token.invalidatedDate
            ? formatDateTime(token.invalidatedDate)
            : 'N/A'}
        </p>
      </div>
      {token?.walletAddress ? (
        <div>
          <span className="font-medium text-gray-700">Wallet Address:</span>
          <p>
            {token?.walletAddress ? (
              <div>
                {formatMessage(
                  {
                    id: 'wallet-address',
                    defaultMessage: 'Wallet {walletAddress}',
                  },
                  { walletAddress: shortenAddress(token?.walletAddress) },
                )}
              </div>
            ) : null}
          </p>
        </div>
      ) : null}
      <div>
        <span className="font-medium text-gray-700">User:</span>
        <p className="text-gray-900">
          <DetailHeader user={token?.user} contact={token?.user.lastContact} />
        </p>
      </div>
    </div>
  );
};

export default TokenDetail;

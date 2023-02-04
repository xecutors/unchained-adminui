import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';

import Badge from '../../common/components/Badge';
import Loading from '../../common/components/Loading';

import NoData from '../../common/components/NoData';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import generateUniqueId from '../../common/utils/getUniqueId';
import shortenAddress from '../../common/utils/shortAddress';
import { useFormatPrice } from '../../common/utils/utils';

import useUserTokens from '../../product/hooks/useUserTokens';
import ExportToken from './ExportToken';

const TokenStatusColor = {
  CENTRALIZED: 'purple',
  EXPORTING: 'yellow',
  DECENTRALIZED: 'green',
};

const UserTokens = ({ _id: userId }) => {
  const { tokens, web3Addresses, loading } = useUserTokens({ userId });
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();

  if (loading) return <Loading />;
  return tokens.length ? (
    <div className="bg-white">
      <div className="mt-5 -mx-px grid grid-cols-1 border-l border-gray-200 sm:mx-0 sm:grid-cols-2 lg:grid-cols-3">
        {tokens?.map(
          ({
            _id,
            walletAddress,
            chainId,
            chainTokenId,
            product,

            status,
          }) => (
            <div className="group relative border-r border-b border-gray-200 p-4 sm:p-6">
              <Link
                href={`/products/${generateUniqueId(product)}`}
                className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75"
              >
                <div>
                  <Image
                    src={
                      (product?.media?.length && product.media[0].file?.url) ||
                      '/no-image.jpg'
                    }
                    loader={defaultNextImageLoader}
                    alt={formatMessage({
                      id: 'product-image',
                      defaultMessage: 'Product image',
                    })}
                    width="100%"
                    layout="responsive"
                    height="100%"
                    className=" h-full w-full "
                  />
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {product?.texts?.title}
                  </h3>
                  <p>
                    {formatMessage(
                      {
                        id: 'token-id',
                        defaultMessage: 'Token ID {chainTokenId}',
                      },
                      { chainTokenId },
                    )}
                  </p>
                  {walletAddress ? (
                    <div>
                      {formatMessage(
                        {
                          id: 'wallet-address',
                          defaultMessage: 'Wallet {walletAddress}',
                        },
                        { walletAddress: shortenAddress(walletAddress) },
                      )}
                    </div>
                  ) : null}
                  <p>
                    {formatMessage(
                      {
                        id: 'chain-id',
                        defaultMessage: 'Chain ID {chainId}',
                      },
                      { chainId },
                    )}
                  </p>
                  <p>
                    {formatMessage(
                      {
                        id: 'token-id',
                        defaultMessage: 'Token ID {chainTokenId}',
                      },
                      { chainTokenId },
                    )}
                  </p>
                  {product?.simulatedPrice ? (
                    <p className="mt-2 text-base font-medium text-gray-900">
                      {formatPrice(product?.simulatedPrice)}
                    </p>
                  ) : null}
                  <div className="mt-2 mb-8">
                    <div className="">
                      <Badge
                        text={
                          status === 'CENTRALIZED'
                            ? 'Off-Chain 🏛'
                            : 'On-Chain ⛓'
                        }
                        color={TokenStatusColor[status]}
                      />
                    </div>
                  </div>
                </div>
              </Link>
              {status !== 'DECENTRALIZED' && (
                <div className="mt-3 flex items-center justify-between">
                  <ExportToken
                    tokenId={_id}
                    walletAddress={web3Addresses}
                    tokenStatus={status}
                  />
                </div>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  ) : (
    <NoData
      message={formatMessage({
        id: 'tokens',
        defaultMessage: 'Tokens',
      })}
    />
  );
};

export default UserTokens;

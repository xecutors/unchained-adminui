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
      <div className="-mx-px grid grid-cols-1  border-l border-gray-200 sm:mx-0 sm:grid-cols-2 lg:grid-cols-3  ">
        {tokens?.map(
          ({
            _id,
            walletAddress,
            chainId,
            chainTokenId,
            product,
            quantity,
            contractAddress,
            status,
          }) => (
            <div className="group relative border-r border-b border-gray-200 p-4 sm:p-6">
              <Link href={`/products/${generateUniqueId(product)}`}>
                <a>
                  <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                    <Image
                      src={
                        (product?.media?.length &&
                          product.media[0].file?.url) ||
                        '/no-image.jpg'
                      }
                      loader={defaultNextImageLoader}
                      alt="TODO"
                      width="100%"
                      layout="responsive"
                      height="100%"
                      className=" h-full w-full "
                    />
                  </div>
                  <div className="pt-2 text-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      {tokens[0]?.product?.texts?.title}
                    </h3>
                    <div className="mt-3 flex flex-col items-center">
                      <p className="sr-only">5 out of 5 stars</p>
                      <div className="flex items-center absolute left-0 top-0">
                        <Badge
                          square
                          text={status}
                          color={TokenStatusColor[status]}
                        />
                      </div>
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
                            id: 'contract-address',
                            defaultMessage: 'Contract {contractAddress}',
                          },
                          { contractAddress: shortenAddress(contractAddress) },
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

                      <p className="mt-1 text-sm text-gray-500 top-0 right-0 absolute">
                        <Badge
                          square
                          text={formatMessage(
                            {
                              id: 'token_quantity',
                              defaultMessage: `{quantity} tokens`,
                            },
                            {
                              quantity,
                            },
                          )}
                        />
                      </p>
                    </div>
                    {product?.simulatedPrice ? (
                      <p className="mt-2 text-base font-medium text-gray-900">
                        {formatPrice(product?.simulatedPrice)}
                      </p>
                    ) : null}
                  </div>
                </a>
              </Link>
              <div className="mt-3 flex flex-col items-center">
                <ExportToken
                  tokenId={_id}
                  addresses={web3Addresses}
                  tokenStatus={status}
                />
              </div>
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

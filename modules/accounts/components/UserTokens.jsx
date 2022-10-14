import Image from 'next/image';
import Link from 'next/link';
import { useIntl } from 'react-intl';
import Accordion from '../../common/components/Accordion';
import Badge from '../../common/components/Badge';
import Loading from '../../common/components/Loading';

import NoData from '../../common/components/NoData';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import generateUniqueId from '../../common/utils/getUniqueId';
import { useFormatPrice } from '../../common/utils/utils';

import ExportTokenForm from '../../product/components/ExportTokenForm';

import useUserTokens from '../../product/hooks/useUserTokens';

const TokenStatusColor = {
  CENTRALIZED: 'purple',
  EXPORTING: 'yellow',
  DECENTRALIZED: 'green',
};

const TokenHeader = ({ status, quantity, chainTokenId }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex item-center">
        <div className="mr-2">{chainTokenId}</div>
        <div className="flex items-center gap-4">
          <Badge text={quantity} />
        </div>
      </div>

      <div className="mr-4 flex text-sm text-slate-500 dark:text-slate-300 sm:mt-0">
        <Badge dotted text={status} color={TokenStatusColor[status]} square />
      </div>
    </div>
  );
};

const TokenBody = ({ product, walletAddress, chainId, _id }) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();

  return (
    <div className="border border-slate-200 rounded-lg mt-2 overflow-hidden bg-white dark:bg-slate-600 text-slate-900 dark:text-white">
      <div className="py-5 sm:p-0">
        <div className="flex justify-between">
          <dl className="divide-y divide-slate-300 px-7 w-full">
            <div className="py-4 sm:py-5">
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
                {formatMessage({
                  id: 'wallet-address',
                  defaultMessage: 'Wallet address',
                })}
              </dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">
                {walletAddress || _id}
              </dd>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-300">
                {formatMessage({
                  id: 'chain',
                  defaultMessage: 'Chain',
                })}
              </dt>
              <dd className="mt-1 text-sm sm:col-span-2 sm:mt-0">{chainId}</dd>
            </div>
          </dl>
          <div className="w-full">
            <section>
              <Link href={`/products/${generateUniqueId(product)}`}>
                <a>
                  <h2 className="sr-only">
                    {formatMessage({
                      id: 'purchased_products',
                      defaultMessage: 'Purchased products',
                    })}
                  </h2>

                  <div className="space-y-8">
                    <div className="mb-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow dark:shadow-none dark:text-slate-200 hover:border hover:border-solid hover:border-blue-600">
                      <div className="px-2 py-1">
                        <div className="flex items-center">
                          <div className="flex flex-shrink-0 overflow-hidden rounded-lg sm:mx-0 ">
                            {product?.media?.length ? (
                              <Image
                                loader={defaultNextImageLoader}
                                src={`${product?.media[0].file.url}`}
                                alt={
                                  product?.texts?.title ||
                                  product?.texts?.subtitle
                                }
                                className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                width={80}
                                height={80}
                                placeholder="blur"
                                blurDataURL="/placeholder.png"
                              />
                            ) : null}
                          </div>

                          <div className="w-1/2 flex flex-col justify-center sm:mt-0 ml-3 sm:flex-auto">
                            <h3
                              className="text-base font-medium text-slate-900 dark:text-slate-200 truncate"
                              // eslint-disable-next-line react/no-danger
                              dangerouslySetInnerHTML={{
                                __html:
                                  product?.texts?.title ||
                                  product?.texts?.subtitle,
                              }}
                            />
                            <div className="mt-1 text-sm font-medium">
                              {product?.simulatedPrice &&
                                formatPrice(product.simulatedPrice)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </section>
          </div>
        </div>
        <div className="py-4 sm:py-5">
          <ExportTokenForm tokenId={_id} />
        </div>
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

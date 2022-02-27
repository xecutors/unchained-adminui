import { useIntl } from 'react-intl';

import Link from 'next/link';
import Image from 'next/image';

const OrderDetailItem = ({ item }) => {
  const { formatMessage } = useIntl();160

  const src = `${item.originalProduct.media[0].file.url}`;

  return (
    <>
      <section aria-labelledby="products-heading">
        <h2 id="products-heading" className="sr-only">
          Products purchased
        </h2>

        <div className="space-y-8">
          <div className="bg-white border border-gray-200 shadow-sm rounded-lg">
            <div className="py-6 px-4 sm:px-6 lg:p-8">
              <div className="flex flex-wrap">
                <div className="flex-shrink-0 w-auto rounded-lg overflow-hidden sm:w-40 sm:h-40">
                  <Image
                    loader={() => src}
                    src={src}
                    alt={
                      item.originalProduct.texts.title ||
                      item.originalProduct.texts.subtitle
                    }
                    className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                    width={160}
                    height={160}
                  />
                </div>

                <div className="mt-6 sm:mt-0 sm:ml-6 sm:flex-auto">
                  <h3 className="text-base font-medium text-gray-900">
                    <Link href={`/products/${item.originalProduct.texts}`}>
                      <a className="text-blue-600">
                        {formatMessage({
                          id: 'item_title',
                          defaultMessage: `${
                            item.originalProduct.texts.title ||
                            item.originalProduct.texts.subtitle
                          }`,
                        })}
                      </a>
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    ${item.unitPrice.amount}
                  </p>
                  <p className="mt-3 text-sm text-gray-500">
                    {formatMessage({
                      id: 'item_description',
                      defaultMessage: `${
                        item.originalProduct.texts.description ||
                        item.originalProduct.texts.subtitle
                      }`,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderDetailItem;

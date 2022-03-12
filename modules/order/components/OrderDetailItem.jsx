import { useIntl } from 'react-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useFormatPrice } from '../../common/utils/utils';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';

const OrderDetailItem = ({ item }) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();
  const src = `${item.originalProduct.media[0].file.url}`;

  return (
    <>
      <section aria-labelledby="products-heading">
        <Link href={`/products/${item.originalProduct.texts.slug}`}>
          <a>
            <h2 id="products-heading" className="sr-only">
              {formatMessage({
                id: 'purchased_products',
                defaultMessage: 'Purchased products',
              })}
            </h2>

            <div className="space-y-8">
              <div className="bg-white border border-gray-200 shadow-sm rounded-lg hover:border hover:border-solid hover:border-blue-600">
                <div className="p-3">
                  <div className="flex flex-wrap">
                    <div className="flex-shrink-0 w-auto rounded-lg overflow-hidden sm:w-10 sm:h-10">
                      <Image
                        loader={defaultNextImageLoader}
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
                      <h3
                        className="text-base font-medium text-gray-900"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html:
                            item.originalProduct.texts.title ||
                            item.originalProduct.texts.subtitle,
                        }}
                      />
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatPrice(item.unitPrice)}
                      </p>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatMessage({
                          id: 'item_title',
                          defaultMessage: 'QTY',
                        })}
                        <span className="pl-1">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </section>
    </>
  );
};

export default OrderDetailItem;

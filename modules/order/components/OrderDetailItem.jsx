import { useIntl } from 'react-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useFormatPrice } from '../../common/utils/utils';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';

const OrderDetailItem = ({ item }) => {
  const { formatMessage } = useIntl();
  const { formatPrice } = useFormatPrice();

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
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm hover:border hover:border-solid hover:border-blue-600">
                <div className="p-3">
                  <div className="flex flex-wrap gap-x-4">
                    <div className="mx-auto w-auto flex-shrink-0 overflow-hidden rounded-lg sm:mx-0">
                      <Image
                        loader={defaultNextImageLoader}
                        src={`${item.originalProduct.media[0].file.url}`}
                        alt={
                          item?.originalProduct?.texts?.title ||
                          item?.originalProduct?.texts?.subtitle
                        }
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                        width={160}
                        height={160}
                      />
                    </div>

                    <div className="mx-auto flex flex-col justify-center sm:mt-0 sm:ml-6 sm:flex-auto">
                      <h3
                        className="text-base font-medium text-gray-900"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html:
                            item?.originalProduct?.texts?.title ||
                            item?.originalProduct?.texts?.subtitle,
                        }}
                      />
                      <div className="flex items-center">
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          {item?.unitPrice && formatPrice(item?.unitPrice)}
                        </p>
                        <p className="mt-2 ml-2 text-sm font-medium text-gray-900">
                          {formatMessage({
                            id: 'item_quantity',
                            defaultMessage: 'Quantity:',
                          })}
                          <span className="ml-2 pl-1">{item?.quantity}</span>
                        </p>
                      </div>
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

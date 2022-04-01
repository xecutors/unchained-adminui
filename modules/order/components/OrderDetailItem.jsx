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
        <Link href={`/products/${item.product.texts.slug}`}>
          <a>
            <h2 id="products-heading" className="sr-only">
              {formatMessage({
                id: 'purchased_products',
                defaultMessage: 'Purchased products',
              })}
            </h2>

            <div className="space-y-8">
              <div className="mb-2 rounded-lg border border-slate-200 bg-white shadow hover:border hover:border-solid hover:border-blue-600">
                <div className="px-2 py-1">
                  <div className="center flex flex-wrap justify-center">
                    <div className="mx-auto flex-shrink-0 overflow-hidden rounded-lg sm:mx-0 ">
                      {item.product?.media?.length ? (
                        <Image
                          loader={defaultNextImageLoader}
                          src={`${item.product?.media[0].file.url}`}
                          alt={
                            item?.product?.texts?.title ||
                            item?.product?.texts?.subtitle
                          }
                          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                          width={80}
                          height={80}
                        />
                      ) : null}
                    </div>

                    <div className="mx-auto flex flex-col justify-center sm:mt-0 ml-3 sm:flex-auto">
                      <h3
                        className="text-base font-medium text-slate-900"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html:
                            item?.originalProduct?.texts?.title ||
                            item?.originalProduct?.texts?.subtitle,
                        }}
                      />
                      <div className="mt-1 text-sm font-medium">
                        {item?.unitPrice && formatPrice(item?.unitPrice)}
                      </div>
                      <div className="mt-2 text-xs">
                        {formatMessage({
                          id: 'item_quantity',
                          defaultMessage: 'Quantity:',
                        })}
                        <span className="ml-2 font-bold">{item?.quantity}</span>
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

import Image from 'next/image';
import Link from 'next/link';
import useQuotationStatusTypes from '../hooks/useQuotationStatusTypes';

const QuotationDetail = ({ quotations }) => {
  const { quotationStatusTypes } = useQuotationStatusTypes();

  return (
    <section aria-labelledby="products-heading" className="my-6">
      <div className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg">
        <div className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
          <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
            <div className="bg-gray-50 rounded-lg">
              <Image
                loader={() => quotations.product?.media?.file.url}
                src={quotations.product?.media?.file.url}
                layout="responsive"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
            <h3 className="text-lg font-medium text-gray-900">
              <Link href={`/products/${quotations.product._id}`}>
                <a href="#">{quotations.product?.texts?.title}</a>
              </Link>
            </h3>
            <p className="font-medium text-gray-900 mt-1">product.price</p>
            <p className="text-gray-500 mt-3">product.description</p>
          </div>
          <div className="sm:col-span-12 md:col-span-7">
            <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
              <div>
                <dt className="font-medium text-gray-900">Delivery address</dt>
                <dd className="mt-3 text-gray-500">
                  <span className="block">product.address[0]</span>
                  <span className="block">product.address[1]</span>
                  <span className="block">product.address[2]</span>
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-900">Shipping updates</dt>
                <dd className="mt-3 text-gray-500 space-y-3">
                  <p>product.email</p>
                  <p>product.phone</p>
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Edit
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotationDetail;

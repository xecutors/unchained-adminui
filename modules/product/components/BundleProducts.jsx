import BundleProductsForm from './BundleProductsForm';
import BundleProductList from './BundleProductsList';

const BundleProducts = ({ productId }) => {
  return (
    <div className="mt-6 overflow-hidden rounded-md border-b">
      <div className="lg:grid lg:grid-cols-4">
        <div className="mb-5 lg:col-span-2 lg:pr-5">
          <BundleProductsForm productId={productId} />
        </div>
        <div className="col-span-2 ml-auto border-gray-200 bg-white px-8 shadow-md lg:w-full">
          <div className="divide-y divide-gray-200 py-4">
            <BundleProductList productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleProducts;

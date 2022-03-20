import BundleProductsForm from './BundleProductsForm';
import BundleProductList from './BundleProductsList';

const BundleProducts = ({ productId }) => {
  return (
    <div className="mt-6 overflow-hidden border-b rounded-md">
      <div className="lg:grid lg:grid-cols-4">
        <div className="lg:col-span-2 mb-5 lg:pr-5">
          <BundleProductsForm productId={productId} />
        </div>
        <div className="col-span-2 lg:w-full ml-auto shadow-md border-gray-200 bg-white px-8">
          <div className="py-4 divide-y divide-gray-200">
            <BundleProductList productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleProducts;

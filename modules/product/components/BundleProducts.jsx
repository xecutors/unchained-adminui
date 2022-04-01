import BundleProductsForm from './BundleProductsForm';
import BundleProductList from './BundleProductsList';

const BundleProducts = ({ productId }) => {
  return (
    <div className="mt-6 overflow-hidden rounded-md">
      <div className="lg:grid lg:grid-cols-9">
        <div className="mb-5 lg:col-span-4 lg:pr-5">
          <BundleProductsForm productId={productId} />
        </div>
        <div className="col-span-5 ml-auto border-slate-200 bg-white px-8 shadow-md lg:w-full">
          <div className="divide-y divide-slate-200 py-4">
            <BundleProductList productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleProducts;

import React from 'react';
import BundleProductsForm from './BundleProductsForm';
import BundleProductList from './BundleProductsList';

const BundleProducts = ({ productId }) => {
  return (
    <div className="mt-6 rounded-md">
      <div className="lg:grid lg:grid-cols-9">
        <div className="mb-5 lg:col-span-4 lg:pr-5">
          <BundleProductsForm productId={productId} />
        </div>
        <div className="col-span-5 ml-auto rounded-md bg-white dark:bg-slate-800 px-8 shadow-md dark:shadow-none lg:w-full">
          <div className="py-4">
            <BundleProductList productId={productId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleProducts;

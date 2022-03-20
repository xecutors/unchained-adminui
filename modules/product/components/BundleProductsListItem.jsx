import { TrashIcon } from '@heroicons/react/solid';
import Image from 'next/image';

import Badge from '../../common/components/Badge';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';

const BundleProductsListItem = ({ item, onDelete, index }) => {
  const { product, quantity } = item;

  return (
    <div className="flex justify-between items-center  border-gray-200 border-b last:border-none">
      <div className="flex items-center space-x-6 py-4">
        {product.media?.length ? (
          <div className="w-20 flex flex-col items-center">
            <div className="flex relative   justify-center items-center m-1 mr-2  mt-1 rounded-full ">
              <Image
                className="mx-auto w-auto"
                src={product.media[0]?.file.url}
                loader={defaultNextImageLoader}
                width={160}
                height={100}
                alt={product?.texts?.title || product?.texts?.subtitle}
              />
            </div>
          </div>
        ) : null}

        <div className="">
          <h3 className="text-lg text-gray-800">{product?.texts?.title}</h3>
          <p className="text-xs text-gray-600">{product?.texts?.subtitle}</p>
        </div>
        <div>
          <Badge text={quantity} color="indigo" square />
        </div>
      </div>

      <div onClick={() => onDelete(index)}>
        <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
      </div>
    </div>
  );
};

export default BundleProductsListItem;

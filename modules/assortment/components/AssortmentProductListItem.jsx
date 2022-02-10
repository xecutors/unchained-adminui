import { TrashIcon } from '@heroicons/react/solid';
import Image from 'next/image';

const AssortmentProductListItem = ({ product, onDelete }) => {
  return (
    <div
      className="flex justify-between items-center  border-gray-200 border-b last:border-none"
      key={product.id}
    >
      <div className="flex items-center space-x-6 py-4">
        <Image
          src={product.image}
          alt={product.title}
          width={80}
          height={40}
          className="object-contain"
        />
        <div className="">
          <h3 className="text-lg text-gray-800">{product.title}</h3>
          <p className="text-xs text-gray-600">{product.desc}</p>
        </div>
      </div>
      <div onClick={onDelete}>
        <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
      </div>
    </div>
  );
};

export default AssortmentProductListItem;

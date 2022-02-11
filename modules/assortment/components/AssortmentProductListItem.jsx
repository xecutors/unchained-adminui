import { TrashIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Badge from '../../common/components/Badge';

const AssortmentProductListItem = ({ link, onDelete }) => {
  const { _id, product, tags } = link;

  return (
    <div className="flex justify-between items-center  border-gray-200 border-b last:border-none">
      <div className="flex items-center space-x-6 py-4">
        <Image
          src={
            product?.media?.length
              ? product?.media[0]?.file?.url
              : '/static/img/home-support.jpg'
          }
          alt={product?.texts?.title}
          width={80}
          height={40}
          className="object-contain"
        />
        <div className="">
          <h3 className="text-lg text-gray-800">{product?.texts?.title}</h3>
          <p className="text-xs text-gray-600">{product?.texts?.subtitle}</p>
        </div>
      </div>
      <div>
        {(tags || [])?.map((tag) => (
          <Badge text={tag} color="cyan" />
        ))}
      </div>
      <div onClick={() => onDelete(_id)}>
        <TrashIcon className="h-5 w-5 cursor-pointer text-red-400" />
      </div>
    </div>
  );
};

export default AssortmentProductListItem;

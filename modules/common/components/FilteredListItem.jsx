import Image from 'next/image';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';

const FilteredListItem = ({ item, onSelected }) => {
  return (
    <a
      className="w-full cursor-pointer border-b border-gray-100 hover:bg-teal-100"
      onClick={() => onSelected(item)}
    >
      <div className="relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 hover:border-teal-100">
        {item.image && (
          <div className="flex w-20 flex-col items-center">
            <div className="relative m-1   mr-2 mt-1 flex items-center  justify-center rounded-full ">
              <Image
                className="mx-auto w-auto"
                src={item.image}
                loader={defaultNextImageLoader}
                width={160}
                height={100}
                alt={item?.title || item?.subtitle}
              />
            </div>
          </div>
        )}
        <div className="flex w-full items-center">
          <div className="mx-2 -mt-1 w-1/2 ">
            {item?.title}
            <div className="-mt-1 w-full truncate text-xs font-normal normal-case text-gray-500">
              {item?.subtitle}
            </div>
          </div>
          {item?.tag ? (
            <div className="w-1/2 flex">
              <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
                <div className="text-xs font-normal leading-none max-w-full flex-initial">
                  {item?.tag}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
};

export default FilteredListItem;

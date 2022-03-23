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
            <div className="flex w-1/2">
              <div className="m-1 flex items-center justify-center rounded-full border border-teal-300 bg-white bg-teal-100 py-1 px-2 font-medium text-teal-700 ">
                <div className="max-w-full flex-initial text-xs font-normal leading-none">
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

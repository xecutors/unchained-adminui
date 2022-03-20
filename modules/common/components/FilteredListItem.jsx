import Image from 'next/image';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';

const FilteredListItem = ({ item }) => {
  return (
    <div className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100">
      <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
        <div className="w-6 flex flex-col items-center">
          <div className="flex relative w-5 h-5 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full ">
            <Image
              className="mx-auto h-12 w-auto"
              src="https://randomuser.me/api/portraits/men/65.jpg"
              loader={defaultNextImageLoader}
              width={160}
              height={100}
              alt={item?.title || item?.subtitle}
            />
          </div>
        </div>
        <div className="w-full items-center flex">
          <div className="mx-2 -mt-1 w-1/2 ">
            {item?.title}
            <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500">
              {item?.subtitle}
            </div>
          </div>
          <div className="w-1/2 flex">
            <div className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
              <div className="text-xs font-normal leading-none max-w-full flex-initial">
                {item?.tag}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredListItem;

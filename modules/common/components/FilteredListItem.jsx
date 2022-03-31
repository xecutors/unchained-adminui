import Image from 'next/image';
import defaultNextImageLoader from '../utils/defaultNextImageLoader';
import NoImage from './NoImage';

const FilteredListItem = ({ item, onSelected }) => {
  return (
    <a
      className="w-full cursor-pointer border-b border-slate-100 hover:bg-teal-100"
      onClick={() => onSelected(item)}
    >
      <div className="relative flex w-full items-center border-l-2 border-transparent p-2 pl-2 hover:border-teal-100">
        {item?.image ? (
          <div className="flex w-20 shrink-0 grow-0 basis-1/5 flex-col items-center">
            <div className="relative m-1 mr-2 mt-1 flex items-center  justify-center rounded-full ">
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
        ) : (
          <NoImage
            className="h-10 w-10"
            containerClassName="basis-1/5 flex item-center justify-center grow-0 shrink-0 h-10 w-20"
          />
        )}
        <div className="flex w-full shrink grow basis-4/5 items-center justify-between overflow-x-hidden">
          <div
            className="mx-2 -mt-1 w-2/3 break-words" // eslint-disable-next-line react/no-danger
          >
            {item?.title}
            <div
              className="-mt-1 w-full break-words text-xs font-normal normal-case text-slate-500"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: item?.subtitle }}
            />
          </div>
          {item?.tag ? (
            <div className="flex w-1/3">
              <div className="m-1 ml-auto flex items-center justify-center rounded-full border border-teal-300 bg-white py-1 px-2 font-medium text-teal-700 ">
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

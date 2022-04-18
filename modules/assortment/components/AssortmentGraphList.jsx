import Link from 'next/link';
import { useIntl } from 'react-intl';
import MediaAvatar from '../../common/components/MediaAvatar';

const AssortmentGraphList = ({ assortments }) => {
  const { formatMessage } = useIntl();
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {assortments.map((assortment) => (
        <Link
          href={`/assortments/graph/${assortment?.texts?.slug}`}
          key={assortment?._id}
        >
          <a>
            <li className="col-span-1 hover:border hover:border-blue-600 bg-white dark:bg-slate-500 rounded-lg shadow divide-y divide-slate-200">
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-slate-900 dark:text-white text-sm font-medium truncate">
                      {assortment?.texts?.title}
                    </h3>
                  </div>
                </div>
                <MediaAvatar
                  file={assortment?.media?.length && assortment.media[0].file}
                  className="mr-2"
                />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-slate-200">
                  {/* <div className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-slate-700 dark:text-slate-300 font-medium border border-transparent rounded-bl-lg hover:text-slate-500">
                    <span className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm font-medium border border-transparent rounded-bl-lg">
                      <MailIcon
                        className="w-5 h-5 text-slate-400 dark:text-slate-100"
                        aria-hidden="true"
                      />
                      <span className="ml-3">Email</span>
                    </span>
                  </div> */}
                  <div className="-ml-px relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-slate-700 dark:text-slate-300 font-medium border border-transparent rounded-bl-lg hover:text-slate-500">
                    <span className="ml-3">
                      {formatMessage({
                        id: 'children',
                        defaultMessage: 'Children:',
                      })}
                    </span>
                    <span className="ml-3">{assortment?.childrenCount}</span>
                  </div>
                </div>
              </div>
            </li>
          </a>
        </Link>
      ))}
    </ul>
  );
};

export default AssortmentGraphList;

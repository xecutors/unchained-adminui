import { useIntl } from 'react-intl';
import { Disclosure } from '@headlessui/react';
import {
  ChevronUpIcon,
  ClipboardListIcon,
  PaperClipIcon,
} from '@heroicons/react/solid';
import NoData from '../../common/components/NoData';

const DocumentList = ({ documents }) => {
  const { formatMessage } = useIntl();
  return (
    <section className="my-3">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="inline-flex items-center justify-between w-full px-4 py-2 rounded-t-md border border-gray-300 bg-grey-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              <span>Documents</span>
              <ChevronUpIcon
                className={`${open ? 'transform rotate-180' : ''} w-5 h-5`}
                aria-hidden="true"
              />
            </Disclosure.Button>
            <Disclosure.Panel>
              {documents?.length ? (
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'attachments',
                      defaultMessage: 'Attachments',
                    })}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {documents.map((document) => (
                        <li
                          key={document._id}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <PaperClipIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <a
                              download
                              className="ml-2 flex-1 w-0 truncate"
                              href={`${document.url}?download=true`}
                            >
                              {document.name}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : (
                <NoData message="documents" icon={ClipboardListIcon} />
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </section>
  );
};

export default DocumentList;

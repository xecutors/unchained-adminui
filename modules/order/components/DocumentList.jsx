import { useIntl } from 'react-intl';
import { ClipboardListIcon } from '@heroicons/react/solid';
import NoData from '../../common/components/NoData';

const DocumentList = ({ documents }) => {
  const { formatMessage } = useIntl();

  return (
    <section className="my-3">
      {documents?.length ? (
        <div className="sm:grid sm:grid-cols-2 sm:gap-1">
          <dt className="text-sm sr-only font-medium text-gray-500">
            {formatMessage({
              id: 'attachments',
              defaultMessage: 'Attachments',
            })}
          </dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
              {documents.map((document) => (
                <li
                  key={document._id}
                  className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                >
                  <div className="flex w-0 flex-1 items-center">
                    <a
                      download
                      className="ml-2 text-indigo-500 w-0 flex-1 truncate"
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
        <NoData
          message={formatMessage({
            id: 'documents',
            defaultMessage: 'Documents',
          })}
          icon={ClipboardListIcon}
        />
      )}
    </section>
  );
};

export default DocumentList;

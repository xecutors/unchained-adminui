import { useIntl } from 'react-intl';
import { PaperClipIcon } from '@heroicons/react/solid';

const DocumentList = ({ documents }) => {
  const { formatMessage } = useIntl();
  return (
    <section>
      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-1">
        <dt className="text-sm font-medium text-gray-500">
          {formatMessage({
            id: 'attachments',
            defaultMessage: 'Attachments',
          })}
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          <ul
            role="list"
            className="border border-gray-200 rounded-md divide-y divide-gray-200"
          >
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
    </section>
  );
};

export default DocumentList;

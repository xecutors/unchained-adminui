import Link from 'next/link';

const getInterfaceLabel = ({ label, version }) => {
  return `${label} ${version}`;
};

const PROVIDER_TYPE_CLASSES = {
  PHYSICAL: 'bg-green-100 text-green-800',
  CARD: ' bg-blue-100 text-blue-500',
  INVOICE: ' bg-lime-100 text-lime-800',
  GENERIC: ' bg-purple-100 text-purple-800',
  PICKUP: ' bg-yellow-100 text-yellow-800',
  SHIPPING: ' bg-blue-100 text-blue-800',
};

const ProviderListItem = ({ provider, onRemove, editPath }) => {
  return (
    <tr key={provider?._id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {getInterfaceLabel(provider?.interface)}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${
            PROVIDER_TYPE_CLASSES[provider.type]
          }`}
        >
          {provider?.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-red-900">
          {provider?.configurationError}
        </div>
      </td>

      <td className="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Link href={`${editPath}/${provider?._id}`}>
          <a
            type="button"
            className="flex text-indigo-500 hover:text-indigo-500"
          >
            <svg
              className=" mt-2 mr-2 h-5 w-5 text-indigo-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {' '}
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />{' '}
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </a>
        </Link>
        <a
          className="ml-1 mr-1 text-red-600 hover:text-red-900 cursor-pointer"
          onClick={async () => {
            await onRemove(provider?._id);
          }}
        >
          <svg
            className="m-2 h-5 w-5 text-red-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {' '}
            <polyline points="3 6 5 6 21 6" />{' '}
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{' '}
            <line x1="10" y1="11" x2="10" y2="17" />{' '}
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </a>
      </td>
    </tr>
  );
};

export default ProviderListItem;

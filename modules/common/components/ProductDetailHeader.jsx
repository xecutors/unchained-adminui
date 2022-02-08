import { useIntl } from 'react-intl';

const ProductDetailHeader = () => {
  const { formatMessage } = useIntl();

  return (
    <div>
      <label id="listbox-label" className="sr-only">
        {formatMessage({
          id: 'change_published_status',
          defaultMessage: 'Change published status',
        })}
      </label>
      <div className="relative">
        <div className="inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
          <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
            <div className="relative inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="ml-2.5 text-sm font-medium">
                {formatMessage({
                  id: 'published',
                  defaultMessage: 'Published',
                })}
              </p>
            </div>
            <button
              type="button"
              className="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              aria-haspopup="listbox"
              aria-expanded="true"
              aria-labelledby="listbox-label"
            >
              <span className="sr-only">
                {formatMessage({
                  id: 'change_published_status',
                  defaultMessage: 'Change published status',
                })}
              </span>

              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <ul
          className="origin-top-right hidden  z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
          tabIndex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-0"
        >
          <li
            className="text-gray-900 cursor-default select-none relative p-4 text-sm"
            id="listbox-option-0"
          >
            <div className="flex flex-col">
              <div className="flex justify-between">
                <p className="font-normal">
                  {formatMessage({
                    id: 'published',
                    defaultMessage: 'Published',
                  })}
                </p>

                <span className="text-indigo-500">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailHeader;

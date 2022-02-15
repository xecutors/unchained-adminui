import { useIntl } from 'react-intl';

const SearchField = ({ inputText, onInputChange }) => {
  const { formatMessage } = useIntl();
  return (
    <div className="flex items-center md:max-w-3xl md:mx-auto lg:max-w-none mx-0 px-0">
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          {inputText ||
            formatMessage({ id: 'search', defaultMessage: 'Search' })}
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            onChange={(e) => onInputChange(e.target.value)}
            id="search"
            name="search"
            className="block max-w-lg w-full bg-white border border-gray-300 text-sm rounded-md py-2 pl-10 pr-3 "
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchField;

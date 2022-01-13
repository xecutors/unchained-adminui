import Layout from '../../modules/common/components/Layout';

const add = ({ ...pageProps }) => {
  return (
    <Layout {...pageProps}>
      <div className="m-10  bg-white shadow-md rounded px-10 pt-8 pb-10 mb-8 ">
        <div className="w-full max-w-xs">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            New currency
          </h3>
        </div>

        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="iso-country-code"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              ISO currency code
            </label>
          </div>

          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <input
              type="text"
              name="isocountrycode"
              id="isocountrycode"
              autoComplete="iso-country-code"
              className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center h-5">
            <input
              id="candidates"
              name="candidates"
              type="checkbox"
              className="m-3 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            Active
          </div>
        </div>
        <button
          type="button"
          className="mt-3 ml-3 mr-3 mt-3 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add currency
        </button>

        <button
          type="button"
          className="mt-3 ml-3 mr-3 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete currency
        </button>
      </div>
    </Layout>
  );
};

export default add;

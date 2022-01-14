import React from 'react';
import Layout from '../../modules/common/components/Layout';

const AddCountries = ({ ...pageProps }) => {
  return (
    <Layout {...pageProps}>
      <div className="m-10   bg-white shadow-md rounded px-10 pt-8 pb-10 mb-8 ">
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-2">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                New Country
              </h3>
            </div>
            <div className="ml-4 mt-2 flex-shrink-0">
              <button type="button">
                <svg
                  className="h-5 w-5 text-red-500"
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
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="iso-country-code"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              ISO Country code
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
          className="w-16 mt-3 ml-2 mr-2  items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>
    </Layout>
  );
};

export default AddCountries;

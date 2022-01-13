import React from 'react';
import Layout from '../../modules/common/components/Layout';

const AddCountries = () => {
  return (
    <Layout>
      <div className="m-10   bg-white shadow-md rounded px-10 pt-8 pb-10 mb-8 ">
        <h3 className="flex-1 text-lg leading-6 font-medium text-gray-900">
          New country
        </h3>

        <div className=" w-full max-w-xs">
          <svg
            className="justifay-r -ml-4 mb-4 mr-2 h-5 w-5 al-l text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
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
          className="mr-3 ml-3  mt-3 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add country
        </button>
        <button
          type="button"
          className="mr-3 ml-3 mt-3 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete country
        </button>
      </div>
    </Layout>
  );
};

export default AddCountries;

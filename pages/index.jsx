import { useIntl } from 'react-intl';
import BreadCrumbs from '../modules/common/components/BreadCrumbs';
import PageHeader from '../modules/common/components/PageHeader';

const Home = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'home',
          defaultMessage: 'Home',
        })}
      />
      <div className="container pt-5 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl leading-6 font-medium text-gray-900">
            Sync Status
          </h3>
          <div className="text-sm">
            <h6 className="text-gray-900">
              Last Sync: <span>19.12.2021 08:49</span>
            </h6>
            <h6 className="text-gray-400">
              Next Sync: <span>19.12.2021 12:49</span>
            </h6>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow-lg divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
          <div className="px-4 py-5 sm:p-6">
            (add a graph here for the last 10 syncs)
          </div>

          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
              Total Products
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                71,897
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from 70,946
                </span>
              </div>

              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                <svg
                  className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Increased by</span>
                997
              </div>
            </dd>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
              Duration of import
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                1h 05m 13s
                <span className="ml-2 text-sm font-medium text-gray-500">
                  1h 02m 12s
                </span>
              </div>

              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                <svg
                  className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Increased by</span>
                2.02%
              </div>
            </dd>
          </div>
        </dl>

        <h3 className="mt-5 pt-5">Products per main category</h3>

        <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow-lg divide-y md:divide-y-0 divide-gray-200 md:divide-x md:grid-cols-3">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">Inkontinenz</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                3201
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from 3196
                </span>
              </div>

              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                <svg
                  className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Increased by</span>5
              </div>
            </dd>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
              Wundbehandlung
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                6349
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from 6349
                </span>
              </div>

              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 md:mt-2 lg:mt-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-gray-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Increased by</span>0
              </div>
            </dd>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
              Ergänzende Produkte
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                723
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from 743
                </span>
              </div>

              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0">
                <svg
                  className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Decreased by</span>
                20
              </div>
            </dd>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">Stoma</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                723
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from 743
                </span>
              </div>

              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0">
                <svg
                  className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Decreased by</span>
                20
              </div>
            </dd>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
              Tracheostoma
            </dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                723
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from 743
                </span>
              </div>

              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0">
                <svg
                  className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Decreased by</span>
                20
              </div>
            </dd>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">Mustersets</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                723
                <span className="ml-2 text-sm font-medium text-gray-500">
                  from 743
                </span>
              </div>

              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 md:mt-2 lg:mt-0">
                <svg
                  className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Decreased by</span>
                20
              </div>
            </dd>
          </div>
        </dl>

        <h3 className="mt-5 pt-5">Products</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-lg rounded-lg overflow-hidden">
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                Added Products
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="flex items-baseline text-2xl font-semibold text-green-600">
                <svg
                  className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                122
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all
                  </a>
                </div>
              </div>
            </dd>
          </div>

          <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-lg rounded-lg overflow-hidden">
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                Removed Products
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="flex items-baseline text-2xl font-semibold text-red-600">
                <svg
                  className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                5
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {' '}
                    View all
                    <span className="sr-only"> Avg. Open Rate stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>

          <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-lg rounded-lg overflow-hidden">
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                Updated Products
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">244</p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View all
                  </a>
                </div>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default Home;

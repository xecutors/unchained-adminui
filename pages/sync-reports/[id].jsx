import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import Link from 'next/link';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import useProductsCount from '../../modules/product/hooks/useProductsCount';
import useWork from '../../modules/work/hooks/useWork';
import SyncCategorySummary from '../../modules/sync/components/SyncCategorySummary';
import SyncChangeIcon from '../../modules/sync/components/SyncChangeIcon';

const SyncDetail = () => {
  const { query } = useRouter();
  const { formatMessage } = useIntl();

  const { id } = query;

  const { work, loading } = useWork({ workId: id });
  const { productsCount } = useProductsCount();
  if (loading || !work) return <Loading />;
  const { result } = work;
  const {
    sync: { stats },
  } = result;

  const getPreviousValue = ({ new: added, removed, diff }, current) => {
    if (added > removed) {
      return current - diff;
    }
    return current + diff;
  };

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
            {formatMessage({
              id: 'sync_status',
              defaultMessage: 'Sync status',
            })}
          </h3>
          <div className="text-sm">
            <div className="">
              <Link href={`/sync-reports/${id}/jobs`}>
                <a>Show Sync details</a>
              </Link>
            </div>
            <h6 className="text-gray-900">
              {formatMessage({
                id: 'started',
                defaultMessage: 'Started',
              })}
              : <span>{format(new Date(result?.startedFrom), 'Pp')}</span>
            </h6>
            <h6 className="text-gray-400">
              {formatMessage({
                id: 'finished',
                defaultMessage: 'Finished',
              })}
              : <span>{format(new Date(result?.startedEnd), 'Pp')}</span>
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
                {productsCount}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'from',
                    defaultMessage: 'From',
                  })}{' '}
                  {getPreviousValue(stats.products, productsCount)}
                </span>
              </div>

              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                <SyncChangeIcon {...stats.products} />
              </div>
            </dd>
          </div>

          <div className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">
              {formatMessage({
                id: 'import_duration',
                defaultMessage: 'Duration of import',
              })}
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

        <SyncCategorySummary
          categoryName={formatMessage({
            id: 'categories',
            defaultMessage: 'Categories',
          })}
          statistics={stats.categories}
        />

        <SyncCategorySummary
          categoryName={formatMessage({
            id: 'products',
            defaultMessage: 'Products',
          })}
          statistics={stats.categories}
        />

        <SyncCategorySummary
          categoryName={formatMessage({
            id: 'filters',
            defaultMessage: 'Filters',
          })}
          statistics={stats.filters}
        />
      </div>
    </>
  );
};

export default SyncDetail;

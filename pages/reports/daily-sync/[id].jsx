import { format, formatDuration, intervalToDuration } from 'date-fns';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

import Link from 'next/link';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import Loading from '../../../modules/common/components/Loading';
import PageHeader from '../../../modules/common/components/PageHeader';
import useProductsCount from '../../../modules/product/hooks/useProductsCount';
import useWork from '../../../modules/work/hooks/useWork';
import SyncCategorySummary from '../../../modules/sync/components/SyncCategorySummary';
import SyncChangeIcon from '../../../modules/sync/components/SyncChangeIcon';
import ProductList from '../../../modules/product/components/ProductList';
import AssortmentList from '../../../modules/assortment/components/AssortmentList';
import normalizeAssortmentSyncData from '../util/normalizeAssortmentSyncData';

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
          id: 'sync_status',
          defaultMessage: 'Sync status',
        })}
      />
      <div className="flex justify-between items-center">
        <div>
          <Link href={`/reports/daily-sync/${id}/jobs`}>
            <a className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {formatMessage({
                id: 'sync_jobs_detail',
                defaultMessage: 'Sync Jobs detail',
              })}
            </a>
          </Link>
        </div>
        <div className="text-sm">
          <h6 className="text-gray-400 flex justify-between">
            <span className="mr-2">
              {formatMessage({
                id: 'started',
                defaultMessage: 'Started',
              })}
              :
            </span>
            <span>{format(new Date(result?.startedFrom), 'Pp')}</span>
          </h6>
          <h6 className="text-gray-900 flex justify-between">
            <span className="mr-2">
              {formatMessage({
                id: 'finished',
                defaultMessage: 'Finished',
              })}
              :
            </span>
            <span>{format(new Date(result?.startedEnd), 'Pp')}</span>
          </h6>
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow-lg divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <div className="px-4 py-5 sm:p-6">
          (add a graph here for the last 10 syncs)
        </div>

        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">
            {formatMessage({
              id: 'total_products',
              defaultMessage: 'Total products',
            })}
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
              <SyncChangeIcon
                {...stats.products}
                productsCount={productsCount}
              />
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
              {formatDuration(
                intervalToDuration({
                  start: new Date(result?.startedEnd || 0),
                  end: new Date(result?.startedFrom || 0),
                }),
              )}
            </div>
          </dd>
        </div>
      </dl>

      <SyncCategorySummary
        categoryName={formatMessage({
          id: 'categories',
          defaultMessage: 'Categories',
        })}
        categories={result?.assortments || {}}
        publishedList={
          <AssortmentList
            showAvatar={false}
            assortments={
              normalizeAssortmentSyncData(result?.assortments)?.published
            }
          />
        }
        removedList={
          <AssortmentList
            showAvatar={false}
            assortments={
              normalizeAssortmentSyncData(result?.assortments)?.removed
            }
          />
        }
        statistics={stats.categories}
      />

      <SyncCategorySummary
        categoryName={formatMessage({
          id: 'products',
          defaultMessage: 'Products',
        })}
        publishedList={
          <ProductList
            showAvatar={false}
            products={normalizeAssortmentSyncData(result?.products)?.published}
          />
        }
        removedList={
          <ProductList
            showAvatar={false}
            products={normalizeAssortmentSyncData(result?.products)?.removed}
          />
        }
        statistics={stats.products}
      />

      <SyncCategorySummary
        categoryName={formatMessage({
          id: 'filters',
          defaultMessage: 'Filters',
        })}
        statistics={stats.filters}
      />
    </>
  );
};

export default SyncDetail;

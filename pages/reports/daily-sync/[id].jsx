import { useEffect, useState } from 'react';

import { format, formatDuration } from 'date-fns';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import subDays from 'date-fns/subDays';

import Link from 'next/link';
import BreadCrumbs from '../../../modules/common/components/BreadCrumbs';
import GraphSync from '../../../modules/common/components/GraphSync';

import Loading from '../../../modules/common/components/Loading';
import PageHeader from '../../../modules/common/components/PageHeader';

import useWork from '../../../modules/work/hooks/useWork';
import SyncCategorySummary from '../../../modules/sync/components/SyncCategorySummary';
import SyncChangeIcon from '../../../modules/sync/components/SyncChangeIcon';
import useDailySyncs from '../../../modules/sync/hooks/useDailySyncs';

const SyncDetail = () => {
  const [today, setToday] = useState(new Date());
  const { query } = useRouter();
  const { formatMessage } = useIntl();

  useEffect(() => {
    setToday(new Date());
  }, []);
  const { dailySync } = useDailySyncs({
    start: subDays(today, 10),
  });

  const { id } = query;

  const { work, loading } = useWork({ workId: id });

  if (loading || !work) return <Loading />;

  const {
    sync: { jobs },
  } = work.result;

  const { result } = work;
  const {
    sync: { stats },
  } = result;

  const durationInMilliSeconds = jobs.reduce(
    (prev, { started, finished }) =>
      prev + (new Date(finished).getTime() - new Date(started).getTime()),
    0,
  );

  const getPreviousValue = ({ new: added, removed, diff, total }) => {
    if (added > removed) {
      return total - diff;
    }
    return total + diff;
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
      <div className="flex items-center justify-between">
        <div>
          <Link href={`/reports/daily-sync/${id}/jobs`}>
            <a className="inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
              {formatMessage({
                id: 'sync_jobs_detail',
                defaultMessage: 'Sync Jobs detail',
              })}
            </a>
          </Link>
        </div>
        <div className="text-sm">
          <h6 className="flex justify-between text-slate-400">
            <span className="mr-2">
              {formatMessage({
                id: 'started',
                defaultMessage: 'Started',
              })}
              :
            </span>
            <span>
              {format(new Date(result?.startedFrom), 'yyyy-MM-dd HH:mm')}
            </span>
          </h6>
          <h6 className="flex justify-between text-slate-900">
            <span className="mr-2">
              {formatMessage({
                id: 'finished',
                defaultMessage: 'Finished',
              })}
              :
            </span>
            <span>
              {format(new Date(result?.startedEnd), 'yyyy-MM-dd HH:mm')}
            </span>
          </h6>
        </div>
      </div>
      <dl className="2xl:divide mt-5 grid grid-cols-1 divide-y divide-slate-200 overflow-hidden rounded-lg bg-white shadow-lg md:divide-x xl:grid-cols-3">
        <div className="2xl: col-span-2 mx-auto max-w-none px-4 py-2 sm:p-2 xl:col-span-1">
          <GraphSync dailySync={dailySync} />
        </div>
        <div className=" col-span-2 py-5 sm:col-span-1 sm:p-6 ">
          <dt className="text-base font-normal text-slate-900">
            {formatMessage({
              id: 'total_products',
              defaultMessage: 'Total products',
            })}
          </dt>
          <dd className="mt-1 flex items-baseline md:block lg:flex xl:space-x-7">
            <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
              {stats.products?.total || 0}
              <span className="ml-2 text-sm font-medium text-slate-500">
                {formatMessage({
                  id: 'from',
                  defaultMessage: 'From',
                })}{' '}
                {getPreviousValue(stats.products)}
              </span>
            </div>

            <div className="inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0">
              <SyncChangeIcon
                {...stats.products}
                productsCount={stats.products?.total || 0}
              />
            </div>
          </dd>
        </div>

        <div className=" col-span-2 flex-wrap py-5 sm:col-span-1  sm:p-6">
          <dt className="flex-wrap text-base font-normal text-slate-900">
            {formatMessage({
              id: 'import_duration',
              defaultMessage: 'Duration of import',
            })}
          </dt>
          <dd className="mt-1 items-baseline  ">
            <div className="flex flex-wrap items-baseline text-2xl font-semibold text-indigo-600">
              {formatDuration({
                hours: Math.floor(durationInMilliSeconds / 1000 / 60 / 60) % 24,
                minutes: Number(
                  Math.floor(durationInMilliSeconds / 1000 / 60) % 60,
                ),
                seconds: Math.floor(durationInMilliSeconds / 1000) % 60,
              })}
            </div>
          </dd>
        </div>
      </dl>

      <SyncCategorySummary
        categoryName={formatMessage({
          id: 'categories',
          defaultMessage: 'Categories',
        })}
        newItemsRoute="new-assortments"
        updatedItemsRoute="updated-assortments"
        statistics={stats.categories}
      />

      <SyncCategorySummary
        categoryName={formatMessage({
          id: 'products',
          defaultMessage: 'Products',
        })}
        newItemsRoute="new-products"
        updatedItemsRoute="updated-products"
        removedItemsRoute="removed-products"
        statistics={stats.products}
      />

      <SyncCategorySummary
        categoryName={formatMessage({
          id: 'filters',
          defaultMessage: 'Filters',
        })}
        newItemsRoute="new-filters"
        updatedItemsRoute="updated-filters"
        statistics={stats.filters}
      />
    </>
  );
};

export default SyncDetail;

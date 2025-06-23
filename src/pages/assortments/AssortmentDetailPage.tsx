import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import AssortmentDetail from '../../modules/assortment/components/AssortmentDetail';
import useAssortment from '../../modules/assortment/hooks/useAssortment';
import useFormatDateTime from '../../modules/common/utils/useFormatDateTime';

const AssortmentDetailPage = ({ assortmentSlug }) => {
  const { formatDateTime } = useFormatDateTime();
  const { formatMessage } = useIntl();

  const { assortment, loading, extendedData } = useAssortment({
    slug: assortmentSlug,
  });

  return (
    <div className="mt-5 max-w-full">
      <BreadCrumbs
        routeName={assortmentSlug}
        depth={3}
        currentPageTitle={assortment?.texts?.title}
      />
      <div>
        <div className="align-center flex-wrap flex min-w-full justify-between">
          <PageHeader
            headerText={
              <>{assortment?.texts?.title || 'Untitled Assortment'}</>
            }
            title={`${assortment?.texts?.title || 'Assortment'} (${assortment?._id})`}
          />
          <span className="mt-3 text-md">{assortment?._id}</span>
        </div>

        <div className="mt-4 mb-6 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
          {assortment?.created && (
            <div className="flex items-center gap-1">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {formatMessage({ id: 'created', defaultMessage: 'Created' })}:
              </span>
              <span>
                {formatDateTime(assortment.created, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          )}

          {assortment?.updated && (
            <div className="flex items-center gap-1">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {formatMessage({ id: 'updated', defaultMessage: 'Updated' })}:
              </span>
              <span>
                {formatDateTime(assortment.updated, {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </span>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <AssortmentDetail assortment={assortment} extendedData={extendedData} />
      )}
    </div>
  );
};

export default AssortmentDetailPage;

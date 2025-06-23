import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import AssortmentDetail from '../../modules/assortment/components/AssortmentDetail';
import useAssortment from '../../modules/assortment/hooks/useAssortment';
import useFormatDateTime from '../../modules/common/utils/useFormatDateTime';
import useModal from '../../modules/modal/hooks/useModal';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useRemoveAssortment from '../../modules/assortment/hooks/useRemoveAssortment';
import useAuth from '../../modules/Auth/useAuth';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';

const AssortmentDetailPage = ({ assortmentSlug }) => {
  const { formatDateTime } = useFormatDateTime();
  const { hasRole } = useAuth();
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { removeAssortment } = useRemoveAssortment();
  const { setModal } = useModal();

  const { assortment, loading, extendedData } = useAssortment({
    slug: assortmentSlug,
  });

  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        onCancelClick={async () => setModal('')}
        message={formatMessage({
          id: 'delete_assortment_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it and it is nonreversible. Are you sure you want to delete this assortment? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeAssortment({ assortmentId: assortment._id });
          toast.success(
            formatMessage({
              id: 'assortment_deleted_success',
              defaultMessage: 'Deleted successfully ',
            }),
          );
          router.push('/assortments');
        }}
      />,
    );
  };

  return (
    <div className="mt-5 max-w-full">
      <BreadCrumbs
        routeName={assortmentSlug}
        depth={3}
        currentPageTitle={assortment?.texts?.title}
      />
      <div>
        <div className="align-center flex min-w-full justify-between">
          <PageHeader
            headerText={
              <>
                {assortment?.texts?.title || 'Untitled Assortment'}
                <span className="text-lg font-normal text-slate-500 ml-2">
                  ({assortment?._id})
                </span>
              </>
            }
            title={`${assortment?.texts?.title || 'Assortment'} (${assortment?._id})`}
          />
          {assortment && hasRole('removeAssortment') ? (
            <HeaderDeleteButton onClick={handleOnClick} />
          ) : null}
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

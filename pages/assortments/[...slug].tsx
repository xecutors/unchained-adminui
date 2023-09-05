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

const AssortmentDetailPage = () => {
  const { formatDateTime } = useFormatDateTime();
  const { hasRole } = useAuth();
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { removeAssortment } = useRemoveAssortment();
  const { query } = useRouter();
  const { setModal } = useModal();
  const { slug = [] } = query || {};
  const normalizedSlug = (slug as string[])?.join('/');
  const { assortment, loading, extendedData } = useAssortment({
    slug: normalizedSlug,
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
    <div className="mt-6 max-w-full">
      <BreadCrumbs
        routeName={normalizedSlug}
        depth={3}
        currentPageTitle={assortment?.texts?.title}
      />
      <PageHeader
        headerText={
          <FormattedMessage
            id="assortment_detail_header"
            defaultMessage="Assortment detail <b>({id})</b>"
            values={{
              b: (chunks) => <b className="text-lg">{chunks}</b>,

              id: assortment?._id,
            }}
          />
        }
      >
        <div id="date">
          {assortment?.created && (
            <FormattedMessage
              id="added_date"
              defaultMessage="<b>Created :</b>  {created} "
              values={{
                b: (chunks) => <b>{chunks}</b>,

                created: formatDateTime(assortment.created, {
                  dateStyle: 'long',
                  timeStyle: 'short',
                }),
              }}
              tagName="div"
            />
          )}

          {assortment?.updated && (
            <FormattedMessage
              id="updated_date"
              defaultMessage="<b>Updated :</b>  {updated} "
              values={{
                b: (chunks) => <b>{chunks}</b>,

                updated: formatDateTime(assortment.updated, {
                  dateStyle: 'long',
                  timeStyle: 'short',
                }),
              }}
              tagName="div"
            />
          )}
        </div>
      </PageHeader>
      <div className="align-center flex min-w-full justify-end mb-3 ">
        {assortment && hasRole('removeAssortment') ? (
          <HeaderDeleteButton onClick={handleOnClick} />
        ) : null}
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

import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import WorkDetail from '../../modules/work/components/WorkDetail';
import useWork from '../../modules/work/hooks/useWork';
import useRemoveWork from '../../modules/work/hooks/useRemoveWork';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';

const WorkDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { id } = query;
  const { work, loading } = useWork({ workId: id });

  const { setModal } = useModal();
  const { removeWork } = useRemoveWork();
  const isDeletable = (status) => {
    return status === 'NEW' || status === 'ALLOCATED';
  };
  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_work_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this work? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeWork({ workId: id });
          toast.success(
            formatMessage(
              {
                id: 'work_deleted',
                defaultMessage: 'work {id} deleted successfully',
              },
              {
                id,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_work',
          defaultMessage: 'Delete work',
        })}
      />,
    );
  };

  return (
    <>
      <div className="mt-6 max-w-full">
        <BreadCrumbs />
        <div className="flex align-center justify-between min-w-full">
          <PageHeader
            headerText={formatMessage({
              id: 'work_detail',
              defaultMessage: 'Work Detail',
            })}
          />
          {work && isDeletable(work?.status) ? (
            <HeaderDeleteButton onClick={handleOnClick} />
          ) : null}
        </div>
        {loading ? <Loading /> : <WorkDetail work={work} />}
      </div>
    </>
  );
};

export default WorkDetailPage;

import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import WorkDetail from '../../modules/work/components/WorkDetail';
import useWork from '../../modules/work/hooks/useWork';
import useRemoveWork from '../../modules/work/hooks/useRemoveWork';
import useAddWork from '../../modules/work/hooks/useAddWork';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import HeaderDeleteButton from '../../modules/common/components/HeaderDeleteButton';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';

import { IWorkStatus } from '../../gql/types';

const WorkDetailPage = () => {
  const { formatMessage } = useIntl();
  const { query, push } = useRouter();

  const { workId } = query;
  const { work, loading } = useWork({
    workId: workId as string,
    pollInterval: 2000,
  });

  const { setModal } = useModal();
  const { removeWork } = useRemoveWork();
  const { addWork } = useAddWork();

  const isDeletable = (status) => {
    return status === IWorkStatus.New || status === IWorkStatus.Allocated;
  };
  const canBeRetried = (work) => {
    return (
      work &&
      (work?.status === IWorkStatus.Failed ||
        work?.status === IWorkStatus.Success)
    );
  };

  const retryWork = useCallback(async () => {
    const { data } = await addWork({
      ...work,
      scheduled: null,
      originalWorkId: work?._id,
    });
    push(`/works/${data.addWork._id}`);
  }, [work]);

  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        onCancelClick={() => setModal('')}
        message={formatMessage({
          id: 'delete_work_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this work? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeWork({ workId: workId as string });
          toast.success(
            formatMessage({
              id: 'work_deleted',
              defaultMessage: 'Work deleted successfully',
            }),
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
    <div className="mt-6 max-w-full">
      <BreadCrumbs />
      <div className="align-center flex min-w-full justify-between">
        <PageHeader
          headerText={formatMessage({
            id: 'work_detail',
            defaultMessage: 'Work Detail',
          })}
          title={formatMessage(
            {
              id: 'work_detail_title',
              defaultMessage: 'Work {id}',
            },
            { id: work?._id },
          )}
        />
        {canBeRetried(work) ? (
          <button
            type="button"
            aria-describedby="header-delete-button"
            className="my-auto flex items-center justify-center rounded border-2 border-green-600 px-3 py-2 text-sm font-semibold text-green-600 shadow-sm hover:border-green-800 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
            onClick={retryWork}
          >
            <span className="pr-1">
              {<ArrowPathIcon className="h-5 w-5" />}
            </span>
            {formatMessage({
              id: 'retry-work',
              defaultMessage: 'Retry',
            })}
          </button>
        ) : null}
        {work && isDeletable(work?.status) ? (
          <HeaderDeleteButton onClick={handleOnClick} />
        ) : null}
      </div>
      {loading ? <Loading /> : <WorkDetail work={work} />}
    </div>
  );
};

export default WorkDetailPage;

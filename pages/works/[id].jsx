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
          {isDeletable(work?.status) ? (
            <button
              type="button"
              onClick={handleOnClick}
              className="felx justify-center items-center bg-red-400 text-white my-auto h-full rounded px-3 py-2 border border-transparent shadow-sm text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
            >
              <span className="pr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
              {formatMessage({
                id: 'work_delete',
                defaultMessage: 'Delete',
              })}
            </button>
          ) : (
            ''
          )}
        </div>
        {loading ? <Loading /> : <WorkDetail work={work} />}
      </div>
    </>
  );
};

export default WorkDetailPage;

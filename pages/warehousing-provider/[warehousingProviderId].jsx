import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { XIcon } from '@heroicons/react/solid';

import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import useRemoveWarehousingProvider from '../../modules/warehousing-providers/hooks/useRemoveWarehousingProvider';
import useUpdateWarehousingProvider from '../../modules/warehousing-providers/hooks/useUpdateWarehousingProvider';
import useWarehousingProvider from '../../modules/warehousing-providers/hooks/useWarehousingProvider';
import useModal from '../../modules/modal/hooks/useModal';
import ProviderDetail from '../../modules/common/components/ProviderDetail';
import Loading from '../../modules/common/components/Loading';
import DangerMessage from '../../modules/modal/components/DangerMessage';

const WarehousingProviderUpdate = () => {
  const { formatMessage } = useIntl();
  const { setModal } = useModal();
  const { push: routerPush, query } = useRouter();

  const { warehousingProviderId } = query;

  const { updateWarehousingProvider } = useUpdateWarehousingProvider();
  const { removeWarehousingProvider } = useRemoveWarehousingProvider();

  const { warehousingProvider, loading } = useWarehousingProvider({
    warehousingProviderId,
  });

  const onSubmit = async ({ configuration: config }) => {
    await updateWarehousingProvider({
      configuration: JSON.parse(config || '[]'),
      warehousingProviderId,
    });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/warehousing-provider');
  };

  const handleOnClick = async () => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_confirmation',
          defaultMessage:
            'This action might cause inconsistencies with other data that relates to it. Are you sure you want to delete this warehousing provider? ',
        })}
        onOkClick={async () => {
          setModal('');
          await removeWarehousingProvider({ warehousingProviderId });
          toast.success(
            formatMessage(
              {
                id: 'warehousing_provider_deleted',
                defaultMessage:
                  'Warehousing provider {warehousingProviderId} deleted successfully',
              },
              {
                warehousingProviderId,
              },
            ),
          );
          routerPush('/warehousing-provider');
        }}
        okText={formatMessage({
          id: 'delete_warehousing_provider',
          defaultMessage: 'Delete Warehousing Provider',
        })}
      />,
    );
  };

  return (
    <>
      <BreadCrumbs />
      <div className="flex align-center justify-between min-w-full">
        <PageHeader
          headerText={formatMessage({
            id: 'update_warehousing_provider_header',
            defaultMessage: 'Update warehousing provider',
          })}
        />
        <button
          type="button"
          onClick={handleOnClick}
          className="flex justify-center items-center bg-red-400 text-white my-auto h-full rounded px-3 py-2 border border-transparent shadow-sm text-sm font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
        >
          <span className="pr-1">
            <XIcon className="inline-block h-4 w-4" />
          </span>
          {formatMessage({
            id: 'warehousing_delete',
            defaultMessage: 'Delete',
          })}
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <ProviderDetail
          provider={warehousingProvider}
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
        />
      )}
    </>
  );
};

export default WarehousingProviderUpdate;

import { useState } from 'react';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

import ProvidersList from '../../modules/common/components/ProvidersList';
import DangerMessage from '../../modules/modal/components/DangerMessage';
import useModal from '../../modules/modal/hooks/useModal';
import useRemoveWarehousingProvider from '../../modules/warehousing-providers/hooks/useRemoveWarehousingProvider';
import useWarehousingProviders from '../../modules/warehousing-providers/hooks/useWarehousingProviders';

const WarehousingProviders = () => {
  const [type, setType] = useState(null);
  const { formatMessage } = useIntl();

  const { warehousingProviders } = useWarehousingProviders({ type });
  const { removeWarehousingProvider } = useRemoveWarehousingProvider();
  const { setModal } = useModal();
  const onRemoveWarehousingProvider = async (warehousingProviderId) => {
    await setModal(
      <DangerMessage
        message={formatMessage({
          id: 'delete_warehousing_provider_confirmation',
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
                  'warehousing provider {id} deleted successfully',
              },
              {
                id: warehousingProviderId,
              },
            ),
          );
        }}
        okText={formatMessage({
          id: 'delete_warehousing_provider',
          defaultMessage: 'Delete warehousing provider',
        })}
      />,
    );

    return true;
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'warehousing_providers_header',
          defaultMessage: 'Warehousing providers',
        })}
      />
      <ProvidersList
        providerType={['PHYSICAL']}
        providerPath="/warehousing-provider"
        providers={warehousingProviders}
        onRemove={onRemoveWarehousingProvider}
        onProviderFilterChange={setType}
      />
    </>
  );
};

export default WarehousingProviders;

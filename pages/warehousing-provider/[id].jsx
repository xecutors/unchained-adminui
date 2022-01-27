import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';

import FormHeader from '../../modules/common/components/FormHeader';
import PageHeader from '../../modules/common/components/PageHeader';
import ProviderConfigurationForm from '../../modules/common/components/ProviderConfigurationForm';
import useRemoveWarehousingProvider from '../../modules/warehousing-providers/hooks/useRemoveWarehousingProvider';
import useUpdateWarehousingProvider from '../../modules/warehousing-providers/hooks/useUpdateWarehousingProvider';
import useWarehousingProvider from '../../modules/warehousing-providers/hooks/useWarehousingProvider';

const WarehousingProviderUpdate = () => {
  const { push: routerPush, query } = useRouter();
  const { formatMessage } = useIntl();
  const { id } = query;

  const { updateWarehousingProvider } = useUpdateWarehousingProvider();
  const { removeWarehousingProvider } = useRemoveWarehousingProvider();
  const { warehousingProvider } = useWarehousingProvider({
    warehousingProviderId: id,
  });

  const onSubmit = async ({ configuration }) => {
    await updateWarehousingProvider({
      configuration,
      warehousingProviderId: id,
    });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/warehousing-provider');
  };

  const onRemoveWarehousingProvider = async () => {
    await removeWarehousingProvider({ warehousingProviderId: id });
    routerPush('/warehousing-provider');
  };

  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'update_warehousing_provider_header',
          defaultMessage: 'Update warehousing provider',
        })}
      />
      <div className="mt-6  sm:max-w-2xl">
        <FormHeader onDelete={onRemoveWarehousingProvider}>
          <ProviderConfigurationForm
            onSubmit={onSubmit}
            onSubmitSuccess={onSubmitSuccess}
            defaultValue={warehousingProvider?.configuration || []}
          />
        </FormHeader>
      </div>
    </>
  );
};

export default WarehousingProviderUpdate;

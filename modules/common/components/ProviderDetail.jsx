import { useState } from 'react';

import FormHeader from './FormHeader';
import ProviderConfigurationForm from './ProviderConfigurationForm';

import { useIntl } from 'react-intl';

import useRemoveDeliveryProvider from '../../delivery-provider/hooks/useRemoveDeliveryProvider';
import useUpdateDeliveryProvider from '../../delivery-provider/hooks/useUpdateDeliveryProvider';

import { getInterfaceLabel, formatDateTime } from '../utils/utils';

const ProviderDetail = ({ provider }) => {
  const [configuration, setConfiguration] = useState(...provider.configuration);
  const [error, setError] = useState();
  // console.log('conf', configuration);

  const conf = JSON.stringify(configuration);

  const { formatMessage } = useIntl();

  const { updateDeliveryProvider } = useUpdateDeliveryProvider();
  const { removeDeliveryProvider } = useRemoveDeliveryProvider();

  const onSubmit = async ({ configuration }) => {
    await updateDeliveryProvider({
      configuration,
      deliveryProviderId: id,
    });
    return true;
  };

  const onSubmitSuccess = () => {
    routerPush('/delivery-provider');
  };

  const onRemoveDeliveryProvider = async () => {
    await removeDeliveryProvider({ deliveryProviderId: id });
    routerPush('/delivery-provider');
  };

  const handleChange = (event) => {
    try {
      const w = JSON.stringify(configuration) + event.target.value;
      const v = JSON.parse(v);
      console.log('v', v);
      setConfiguration(v);
    } catch (err) {
      console.log(err);
      // setError({ error: err });
    }
  };

  return (
    <div className="mt-6">
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {getInterfaceLabel(provider?.interface)}
          </h3>

          <div className="grid mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {formatMessage({ id: 'type', defaultMessage: 'Type' })}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="type"
                  id="type"
                  disabled
                  value={provider?.type}
                  className="block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="created"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {formatMessage({
                  id: 'created',
                  defaultMessage: 'Created Date',
                })}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="created"
                  id="created"
                  disabled
                  value={formatDateTime(provider?.created)}
                  className="block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="created"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {formatMessage({
                  id: 'created',
                  defaultMessage: 'Last Updated Date',
                })}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="created"
                  id="created"
                  disabled
                  value={formatDateTime(provider?.updated)}
                  className="block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="created"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {formatMessage({
                  id: 'created',
                  defaultMessage: 'Active',
                })}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="created"
                  id="created"
                  disabled
                  value={provider?.isActive || false}
                  className="block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="configurationerror"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {formatMessage({
                  id: 'configurationerror',
                  defaultMessage: 'Configuration Error',
                })}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="configurationerror"
                  id="configurationerror"
                  disabled
                  value={provider?.configurationError || ' '}
                  className="block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {formatMessage({
                  id: 'configuration',
                  defaultMessage: 'Configuration',
                })}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  type="text"
                  id="configuration"
                  name="configuration"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  value={JSON.stringify(configuration, undefined, 2) || ' '}
                  onChange={handleChange}
                />
                <p className="mt-2 text-sm text-gray-500">
                  {console.log(error)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ProviderConfigurationForm
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        defaultValue={provider?.configuration || []}
      />
    </div>
  );
};

export default ProviderDetail;

import { CheckCircleIcon } from '@heroicons/react/solid';
import { useIntl } from 'react-intl';

import { getInterfaceLabel } from '../utils/utils';
import useFormatDateTime from '../utils/useFormatDateTime';
import { PROVIDER_TYPE_CLASSES } from '../data/miscellaneous';
import ProviderConfigurationForm from './ProviderConfigurationForm';
import ActiveInActive from './ActiveInActive';

const ProviderDetail = ({ provider, onSubmit, onSubmitSuccess }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  const dateFormatOption = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  return (
    <div className="my-6">
      <div className="space-y-8 divide-y divide-slate-200">
        <div className="space-y-8 divide-y divide-slate-200 sm:space-y-5">
          <div className="flex items-center">
            <h3 className="text-lg font-medium leading-6 text-slate-900 mr-2">
              {getInterfaceLabel(provider?.interface)}
            </h3>
            <ActiveInActive />
          </div>
          <div className="mt-6 flex flex-col">
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
              <div className="flex justify-center py-4 sm:py-5">
                <dt className="my-auto inline-block text-sm font-medium text-slate-400">
                  {formatMessage({ id: 'type_colon', defaultMessage: 'Type:' })}
                </dt>
                <dd
                  className={`bg-${
                    PROVIDER_TYPE_CLASSES[provider.type]
                  }-100 text-${
                    PROVIDER_TYPE_CLASSES[provider.type]
                  }-800 ml-4 inline-block rounded-lg border p-2 text-lg font-bold leading-4`}
                >
                  {provider?.type}
                </dd>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-auto items-center">
                  <dt className="text-sm font-normal text-slate-400 sm:justify-self-end">
                    {formatMessage({
                      id: 'created_colon',
                      defaultMessage: 'Created:',
                    })}
                  </dt>
                  <dd className="ml-auto text-base font-medium">
                    {formatDateTime(provider?.created, dateFormatOption)}
                  </dd>
                </div>
                <div className="flex flex-auto">
                  <dt className="text-sm font-normal text-slate-400 sm:justify-self-end">
                    {formatMessage({
                      id: 'last_updated',
                      defaultMessage: 'Last Updated:',
                    })}
                  </dt>
                  <dd className="ml-2 text-base font-medium">
                    {formatDateTime(provider?.updated, dateFormatOption)}
                  </dd>
                </div>
              </div>
            </div>

            <ProviderConfigurationForm
              onSubmit={onSubmit}
              onSubmitSuccess={onSubmitSuccess}
              provider={provider}
            />

            <div className="mt-6 mb-3">
              <dt className="inline-block text-sm font-normal text-slate-400">
                {formatMessage({
                  id: 'configuration_error',
                  defaultMessage: 'Configuration error',
                })}
              </dt>
              {provider?.configurationError ? (
                <dd className="block">{provider?.configurationError}</dd>
              ) : (
                <CheckCircleIcon className="ml-2 inline-block h-6 w-6 text-green-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;

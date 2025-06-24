import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useIntl } from 'react-intl';

import { getInterfaceLabel } from '../utils/utils';
import useFormatDateTime from '../utils/useFormatDateTime';
import { PROVIDER_TYPE_CLASSES } from '../data/miscellaneous';
import ProviderConfigurationForm from './ProviderConfigurationForm';
import ActiveInActive from './ActiveInActive';

const ProviderDetail = ({ provider, onSubmit, onSubmitSuccess, readOnly }) => {
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();

  return (
    <div className="my-6">
      <div className="space-y-8">
        <div className="space-y-8 sm:space-y-5">
          <div className="flex items-center">
            <h3 className="text-2xl leading-6 text-slate-900 dark:text-slate-200 mr-2">
              {getInterfaceLabel(provider?.interface)}
            </h3>
            <ActiveInActive
              containerClassName="self-end"
              isActive={provider?.isActive}
            />
          </div>
          <div className="mt-6 flex flex-col">
            <div className="max-w-xs">
              <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
                <div className="flex justify-between w-full gap-3">
                  <dt className="my-auto inline-block text-sm text-slate-400 ">
                    {formatMessage({
                      id: 'type_colon',
                      defaultMessage: 'Type:',
                    })}
                  </dt>
                  <dd
                    className={`bg-${
                      PROVIDER_TYPE_CLASSES[provider?.type]
                    }-100 text-${
                      PROVIDER_TYPE_CLASSES[provider?.type]
                    }-800 inline-block rounded-lg border px-2 text-md`}
                  >
                    {provider?.type}
                  </dd>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-auto items-center">
                  <dt className="text-sm font-normal text-slate-400 sm:justify-self-end pr-2">
                    {formatMessage({
                      id: 'created_colon',
                      defaultMessage: 'Created:',
                    })}
                  </dt>
                  <dd className="ml-auto text-base">
                    {formatDateTime(provider?.created, {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    })}
                  </dd>
                </div>
                <div className="flex flex-auto items-center">
                  <dt className="text-sm font-normal text-slate-400 sm:justify-self-end pr-2">
                    {formatMessage({
                      id: 'last_updated',
                      defaultMessage: 'Last Updated:',
                    })}
                  </dt>
                  <dd className="ml-auto text-base">
                    {formatDateTime(provider?.updated, {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    })}
                  </dd>
                </div>
              </div>
            </div>

            <ProviderConfigurationForm
              onSubmit={onSubmit}
              onSubmitSuccess={onSubmitSuccess}
              provider={provider}
              readOnly={readOnly}
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
                <CheckCircleIcon className="ml-2 inline-block h-6 w-6 text-emerald-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;

/* eslint-disable no-console */
import { useState } from 'react';

import { useIntl } from 'react-intl';
// import FormHeader from './FormHeader';

// import useRemoveDeliveryProvider from '../../delivery-provider/hooks/useRemoveDeliveryProvider';
// import useUpdateDeliveryProvider from '../../delivery-provider/hooks/useUpdateDeliveryProvider';
import Badge from './Badge';

import { getInterfaceLabel, formatDateTime } from '../utils/utils';
import Form from '../../forms/components/Form';

import JSONAreaField from '../../forms/components/JSONAreaField';
import useForm from '../../forms/hooks/useForm';

const ProviderDetail = ({ provider }) => {
  const [configuration] = useState(
    JSON.stringify(provider?.configuration, undefined, 2),
  );

  const { formatMessage } = useIntl();

  const form = useForm({
    submit: () => {},
    initialValues: {
      configuration,
    },
  });

  return (
    <div className="my-6">
      <Form form={form} className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="flex items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {getInterfaceLabel(provider?.interface)}
            </h3>

            <Badge
              text={
                provider?.isActive ||
                formatMessage({
                  id: 'not_active',
                  defaultMessage: 'Not Active',
                })
              }
              className="capitalize p-1 ml-4 text-xs font-medium text-slate-600 rounded-lg"
              square
            />
          </div>

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
                htmlFor="configurationerror"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {formatMessage({
                  id: 'configurationerror',
                  defaultMessage: 'Configuration Error',
                })}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
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
              <JSONAreaField
                name="configuration"
                label={formatMessage({
                  id: 'configuration',
                  defaultMessage: 'Configuration',
                })}
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProviderDetail;

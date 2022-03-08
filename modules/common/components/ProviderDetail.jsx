import { CheckCircleIcon } from '@heroicons/react/solid';
import { useIntl } from 'react-intl';

import Badge from './Badge';
import Form from '../../forms/components/Form';
import JSONAreaField from '../../forms/components/JSONAreaField';
import useForm from '../../forms/hooks/useForm';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import { getInterfaceLabel, formatDateTime } from '../utils/utils';

const ProviderDetail = ({ provider, onSubmit, onSubmitSuccess }) => {
  const { formatMessage } = useIntl();

  const dateFormatOption = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  const activeStatus = provider?.isActive || false;

  const form = useForm({
    initialValues: {
      configuration: JSON.stringify(provider?.configuration || {}, null, 2),
    },
    submit: onSubmit,
    onSubmitSuccess,
  });

  return (
    <div className="my-6">
      <div className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="flex items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {getInterfaceLabel(provider?.interface)}
            </h3>

            <Badge
              text={
                activeStatus
                  ? formatMessage({
                      id: 'not_active',
                      defaultMessage: 'Active',
                    })
                  : formatMessage({
                      id: 'not_active',
                      defaultMessage: 'Not Active',
                    })
              }
              className={`capitalize p-1 ml-4 text-xs font-medium text-slate-600 rounded-lg ${
                activeStatus ? 'bg-green-500' : 'bg-red-500'
              }`}
              square
            />
          </div>
          <div className="flex flex-col mt-6">
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center py-4 sm:py-5">
                <dt className="inline-block text-sm font-medium text-gray-400">
                  {formatMessage({ id: 'type', defaultMessage: 'Type:' })}
                </dt>
                <dd className="inline-block ml-4 text-lg font-bold border leading-4 rounded-lg shadow-lg p-2">
                  {provider?.type}
                </dd>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 items-center">
                <dd className="text-sm font-normal text-gray-400 justify-self-end">
                  {formatMessage({
                    id: 'created',
                    defaultMessage: 'Created:',
                  })}
                </dd>
                <dt className="text-base font-medium ml-2">
                  {formatDateTime(provider?.created, dateFormatOption)}
                </dt>
                <dd className="text-sm font-normal text-gray-400 justify-self-end">
                  {formatMessage({
                    id: 'created',
                    defaultMessage: 'Last Updated:',
                  })}
                </dd>
                <dt className="text-base font-medium ml-2">
                  {formatDateTime(provider?.updated, dateFormatOption)}
                </dt>
              </div>
            </div>

            <Form form={form} className="mt-6">
              <label
                htmlFor="configuration"
                className="block text-sm font-medium text-gray-400 sm:mt-px sm:pt-2"
              >
                {formatMessage({
                  id: 'configuration_label',
                  defaultMessage: 'Configuration',
                })}
              </label>
              <div className="mt-1 sm:mt-0">
                <JSONAreaField
                  id="configuration"
                  name="configuration"
                  value={form.formik.values.configuration}
                  hideLabel
                />
                <FormErrors />
                <SubmitButton label="Update configuration" className="my-2" />
              </div>
            </Form>

            <div className="mt-6 mb-3">
              <dt className="inline-block text-sm font-normal text-gray-400">
                {formatMessage({
                  id: 'configurationerror',
                  defaultMessage: 'Configuration Error:',
                })}
              </dt>
              {provider?.configurationError ? (
                <dd className="block">{provider?.configurationError}</dd>
              ) : (
                <CheckCircleIcon className="h-6 w-6 text-green-500 inline-block ml-4" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;

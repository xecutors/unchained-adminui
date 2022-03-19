import { CheckCircleIcon } from '@heroicons/react/solid';
import { useIntl } from 'react-intl';

import Badge from './Badge';
import Form from '../../forms/components/Form';
import JSONAreaField from '../../forms/components/JSONAreaField';
import useForm from '../../forms/hooks/useForm';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';
import { getInterfaceLabel } from '../utils/utils';
import useFormatDateTime from '../utils/useFormatDateTime';
import { PROVIDER_TYPE_CLASSES } from '../data/miscellaneous';

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
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {getInterfaceLabel(provider?.interface)}
            </h3>

            <Badge
              text={
                provider?.isActive
                  ? formatMessage({
                      id: 'active',
                      defaultMessage: 'Active',
                    })
                  : formatMessage({
                      id: 'not_active',
                      defaultMessage: 'Not Active',
                    })
              }
              color={provider?.isActive ? 'green' : 'red'}
              className="ml-3"
              square
            />
          </div>
          <div className="mt-6 flex flex-col">
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
              <div className="flex justify-center py-4 sm:py-5">
                <dt className="my-auto inline-block text-sm font-medium text-gray-400">
                  {formatMessage({ id: 'type_colon', defaultMessage: 'Type:' })}
                </dt>
                <dd
                  className={`bg-${
                    PROVIDER_TYPE_CLASSES[provider.type]
                  }-100 text-${
                    PROVIDER_TYPE_CLASSES[provider.type]
                  }-800 ml-4 inline-block rounded-lg border p-2 text-lg font-bold leading-4 shadow`}
                >
                  {provider?.type}
                </dd>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-auto items-center">
                  <dt className="text-sm font-normal text-gray-400 sm:justify-self-end">
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
                  <dt className="text-sm font-normal text-gray-400 sm:justify-self-end">
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

            <Form form={form} className="mt-6">
              <label
                htmlFor="configuration"
                className="block text-sm font-medium text-gray-400 sm:mt-px sm:pt-2"
              >
                {formatMessage({
                  id: 'configuration',
                  defaultMessage: 'Configuration',
                })}
              </label>
              <div className="mt-1 sm:mt-0">
                <JSONAreaField
                  id="configuration"
                  name="configuration"
                  value={form.formik.values.configuration}
                  label={formatMessage({
                    id: 'configuration',
                    defaultMessage: 'Configuration',
                  })}
                  hideLabel
                />
                <FormErrors />
                <SubmitButton
                  label={formatMessage({
                    id: 'update_configuration',
                    defaultMessage: 'Update configuration',
                  })}
                  className="my-2"
                />
              </div>
            </Form>

            <div className="mt-6 mb-3">
              <dt className="inline-block text-sm font-normal text-gray-400">
                {formatMessage({
                  id: 'configuration_error',
                  defaultMessage: 'Configuration error',
                })}
              </dt>
              {provider?.configurationError ? (
                <dd className="block">{provider?.configurationError}</dd>
              ) : (
                <CheckCircleIcon className="ml-4 inline-block h-6 w-6 text-green-500" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetail;

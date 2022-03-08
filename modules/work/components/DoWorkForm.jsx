import { useIntl } from 'react-intl';
import FormHeader from '../../common/components/FormHeader';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import Form from '../../forms/components/Form';
import JSONAreaField from '../../forms/components/JSONAreaField';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import useDoWork from '../hooks/useDoWork';
import useRegisteredWorkTypes from '../hooks/useRegisteredWorkTypes';

const DoWorkForm = () => {
  const { formatMessage } = useIntl();
  const { doWork } = useDoWork();
  const onSubmit = async ({ type, input }) => {
    await doWork({ type, input: JSON.parse(input) });
    return true;
  };
  const successMessage = formatMessage({
    id: 'work_started_success',
    defaultMessage: 'Work started successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    successMessage,
    enableReinitialize: true,
    initialValues: {
      type: '',
      input: [],
    },
  });

  const { workTypes } = useRegisteredWorkTypes();
  return (
    <FormHeader>
      <Form form={form}>
        <div className="space-y-6 sm:p-6 rounded-md relative max-w-full">
          <div className=" max-w-4xl sm:mr-10 justify-between align-baseline">
            <div className="py-3">
              <div className="text-sm  font-medium text-gray-500">
                {formatMessage({ id: 'type', defaultMessage: 'Type' })}
              </div>
            </div>
            <SelectField
              className="py-2 text-sm text-gray-900 sm:mt-0 w-full"
              label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
              placeholder={formatMessage({
                id: 'type',
                defaultMessage: 'Type',
              })}
              hideLabel
              name="type"
              required
              options={convertArrayOfObjectToObject(
                workTypes,
                'label',
                'value',
              )}
            />
          </div>

          <div className=" text-lg font-sm text-gray-500">
            {formatMessage({
              id: 'input',
              defaultMessage: 'Input',
            })}
          </div>

          <JSONAreaField
            name="input"
            hideLabel
            label={formatMessage({
              id: 'input',
              defaultMessage: 'Input',
            })}
          />
        </div>

        <div className="px-5 sm:px-15 space-y-6 sm:p-6 bg-gray-50 text-right">
          <SubmitButton
            label={formatMessage({
              id: 'do_work',
              defaultMessage: 'Do Work',
            })}
            full
          />
        </div>
      </Form>
    </FormHeader>
  );
};

export default DoWorkForm;

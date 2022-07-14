import { useIntl } from 'react-intl';
import useAuth from '../../Auth/useAuth';
import FormWrapper from '../../common/components/FormWrapper';
import { convertArrayOfObjectToObject } from '../../common/convertArrayOfObjectToObject';
import ACTION_ROLES from '../../common/data/roles';
import Form from '../../forms/components/Form';
import FormErrors from '../../forms/components/FormErrors';
import JSONAreaField from '../../forms/components/JSONAreaField';
import SelectField from '../../forms/components/SelectField';
import SubmitButton from '../../forms/components/SubmitButton';
import useForm from '../../forms/hooks/useForm';
import useDoWork from '../hooks/useDoWork';
import useRegisteredWorkTypes from '../hooks/useRegisteredWorkTypes';

const DoWorkForm = () => {
  const { formatMessage } = useIntl();
  const { doWork } = useDoWork();
  const { hasRole } = useAuth();
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
    getSubmitErrorMessage: async (error) => {
      return error?.message || '';
    },
    initialValues: {
      type: '',
      input: '',
    },
  });

  const { workTypes } = useRegisteredWorkTypes();
  return (
    <FormWrapper>
      <Form form={form}>
        <div className="relative max-w-full space-y-6 rounded-md p-6">
          <div className="w-full justify-between align-baseline sm:mr-10">
            <SelectField
              className="w-full py-2 text-sm text-slate-900 dark:text-slate-200 sm:mt-0"
              label={formatMessage({ id: 'type', defaultMessage: 'Type' })}
              placeholder={formatMessage({
                id: 'type',
                defaultMessage: 'Type',
              })}
              labelClassName="text-sm font-medium text-slate-500 dark:text-slate-200 mb-2"
              name="type"
              required
              options={convertArrayOfObjectToObject(
                workTypes,
                'label',
                'value',
              )}
            />
          </div>

          <JSONAreaField
            name="input"
            label={formatMessage({
              id: 'input',
              defaultMessage: 'Input',
            })}
            labelClassName="text-sm font-medium text-slate-500 mb-2"
          />
        </div>
        <FormErrors />

        <div className="border-t-indigo-50 border-t dark:border-t-slate-700 sm:px-15 space-y-6 bg-slate-50 dark:bg-slate-800 p-5 text-right">
          <SubmitButton
            hidden={!hasRole(ACTION_ROLES.work.doWork)}
            label={formatMessage({
              id: 'do_work',
              defaultMessage: 'Do Work',
            })}
            full
          />
        </div>
      </Form>
    </FormWrapper>
  );
};

export default DoWorkForm;

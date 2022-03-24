import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useSetUserName from '../hooks/useSetUsername';

const UserNameView = ({ _id: userId, username }) => {
  const { setUserName } = useSetUserName();
  const [isEdit, setIsEdit] = useState(false);
  const { formatMessage } = useIntl();

  const onUpdateUserName = async ({ username: newUsername }) => {
    await setUserName({ username: newUsername, userId });
    setIsEdit(false);
    return true;
  };

  const successMessage = formatMessage({
    id: 'username_updated',
    defaultMessage: 'Username updated successfully!',
  });
  const form = useForm({
    submit: onUpdateUserName,
    successMessage,
    initialValues: {
      username,
    },
  });
  return (
    <Form form={form}>
      <dl className="divide-y divide-gray-200">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 flex items-center flex-wrap">
          <div className="text-sm font-medium text-gray-500">
            {formatMessage({ id: 'username', defaultMessage: 'Username' })}
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span className="flex-grow">
              {isEdit ? (
                <TextField
                  className="w-full mt-0"
                  name="username"
                  label={formatMessage({
                    id: 'username',
                    defaultMessage: 'Username',
                  })}
                  hideLabel
                />
              ) : (
                username
              )}
            </span>

            <span className="ml-4 flex-shrink-0 flex items-center space-x-4">
              <button
                onClick={() => setIsEdit(!isEdit)}
                type="button"
                className={classNames(
                  isEdit ? '' : 'focus:ring-indigo-500',
                  'inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                )}
              >
                {isEdit ? 'Cancel' : 'Update'}
              </button>
              {isEdit && (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {formatMessage({
                    id: 'save',
                    defaultMessage: 'Save',
                  })}
                </button>
              )}
            </span>
          </div>
        </div>
      </dl>
    </Form>
  );
};

export default UserNameView;

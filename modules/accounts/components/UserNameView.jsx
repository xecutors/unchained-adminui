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
        <div className="flex flex-wrap items-center sm:grid sm:grid-cols-3 sm:gap-4">
          <div className="shrink grow basis-2/5 text-sm font-medium text-gray-500">
            {formatMessage({ id: 'username', defaultMessage: 'Username' })}
          </div>
          <div className="shirnk mt-1 flex grow basis-3/5 flex-wrap items-center gap-4 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:gap-0">
            <span className="flex-grow">
              {isEdit ? (
                <TextField
                  className="mt-0"
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

            <span className="ml-4 flex flex-shrink-0 items-center space-x-4">
              <button
                onClick={() => setIsEdit(!isEdit)}
                type="button"
                className={classNames(
                  isEdit ? '' : 'focus:ring-indigo-400',
                  'inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2',
                )}
              >
                {isEdit ? 'Cancel' : 'Update'}
              </button>
              {isEdit && (
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
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

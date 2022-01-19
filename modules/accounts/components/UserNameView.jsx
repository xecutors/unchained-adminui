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

  const form = useForm({
    submit: onUpdateUserName,
    initialValues: {
      username,
    },
  });
  return (
    <Form form={form}>
      <div>
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
            <dt className="text-sm font-medium text-gray-500">
              {formatMessage({ id: 'username', defaultMessage: 'Username' })}
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                {isEdit ? (
                  <TextField className="w-full mt-0" name="username" label="" />
                ) : (
                  username
                )}
              </span>

              <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                <button
                  onClick={() => setIsEdit(!isEdit)}
                  type="button"
                  className={classNames(
                    isEdit
                      ? 'text-red-600 hover:text-red-500  focus:ring-red-500'
                      : 'text-purple-600 hover:text-purple-500  focus:ring-purple-500',
                    'bg-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                  )}
                >
                  {isEdit ? 'Cancel' : 'update'}
                </button>
                {isEdit && (
                  <>
                    <span className="text-gray-300" aria-hidden="true">
                      |
                    </span>
                    <button
                      type="submit"
                      className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Save
                    </button>
                  </>
                )}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </Form>
  );
};

export default UserNameView;

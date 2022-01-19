import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import DatePickerField from '../../forms/components/DatePickerField';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useUpdateUserAvatar from '../hooks/useUpdateUserAvatar';
import useUpdateUserProfile from '../hooks/useUpdateUserProfile';

const ProfileView = ({ profile = {}, avatar, username, name, _id }) => {
  const { address } = profile || {};
  const fileInputRef = useRef();
  const { formatMessage } = useIntl();
  const { updateUserProfile } = useUpdateUserProfile();
  const { updateUserAvatar } = useUpdateUserAvatar();
  const [isEdit, setIsEdit] = useState(false);
  const onUpdateProfile = async (updatedProfile) => {
    const { displayName, phoneMobile, birthday, gender } = updatedProfile;
    const {
      firstName,
      lastName,
      company,
      addressLine,
      addressLine2,
      postalCode,
      regionCode,
      countryCode,
      city,
    } = updatedProfile;

    await updateUserProfile({
      profile: {
        displayName,
        phoneMobile,
        birthday,
        gender,
        address: {
          firstName,
          lastName,
          company,
          addressLine,
          addressLine2,
          postalCode,
          regionCode,
          countryCode,
          city,
        },
      },
    });
    setIsEdit(false);
    return true;
  };

  const onUpdateAvatar = async ({ target }) => {
    const [file] = target.files;

    await updateUserAvatar({
      userId: _id,
      avatar: file,
    });

    return true;
  };

  const form = useForm({
    submit: onUpdateProfile,
    initialValues: {
      ...profile,
      ...profile?.address,
    },
  });

  return (
    <Form form={form}>
      <div className="px-4 py-5 bg-white space-y-6 sm:p-6 rounded-md">
        <div className=" flex justify-between">
          <div className="space-y-1">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Profile
            </h3>
            <p className="max-w-2xl text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
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
        </div>
        <div className="mt-6">
          <dl className="py-4 divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
              <dt className="text-sm font-medium text-gray-500">Photo</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  <input
                    onChange={onUpdateAvatar}
                    multiple={false}
                    ref={fileInputRef}
                    type="file"
                    hidden
                  />
                  {avatar ? (
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={avatar?.url}
                      alt=""
                    />
                  ) : (
                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  )}
                </span>
                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    type="button"
                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm h-10 font-medium text-gray-500">Name</dt>
              <dd className="mt-1 py-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEdit ? (
                  <TextField
                    className="w-full mt-0"
                    name="displayName"
                    required
                  />
                ) : (
                  <span className="flex-grow">{name}</span>
                )}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm h-10 font-medium text-gray-500">
                Username
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{username}</span>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm h-10 font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEdit ? (
                  <SelectField
                    className="w-full mt-0"
                    label=""
                    name="gender"
                    options={{
                      M: formatMessage({ id: 'male', defaultMessage: 'Male' }),
                      F: formatMessage({
                        id: 'female',
                        defaultMessage: 'Female',
                      }),
                    }}
                  />
                ) : (
                  <span className="flex-grow">{profile?.gender}</span>
                )}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm h-10 font-medium text-gray-500">
                Birthday
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEdit ? (
                  <DatePickerField
                    label=""
                    className="w-full mt-0"
                    name="birthday"
                  />
                ) : (
                  <span className="flex-grow">{profile?.birthday}</span>
                )}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm h-10 font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEdit ? (
                  <TextField
                    className="w-full mt-0"
                    name="phoneMobile"
                    label=""
                  />
                ) : (
                  <span className="flex-grow">{profile?.phoneMobile}</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-7 pt-3 border-t flex justify-between">
          <div className="space-y-1 ">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Address
            </h3>
            <p className="max-w-2xl text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm h-10 font-medium text-gray-500">
                Full name
              </dt>
              <dd className="mt-1  flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEdit ? (
                  <div className=" flex">
                    <TextField
                      className="ml-2 w-full mt-0"
                      name="firstName"
                      label=""
                    />{' '}
                    <TextField
                      className="ml-2 w-full mt-0"
                      name="lastName"
                      label=""
                    />
                  </div>
                ) : (
                  <span className="flex-grow">
                    {address?.firstName} {address?.lastName}{' '}
                  </span>
                )}
              </dd>
            </div>
            <div className=" py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm h-10 font-medium text-gray-500">
                Company
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEdit ? (
                  <TextField className="w-full mt-0" name="company" label="" />
                ) : (
                  <span className="flex-grow">{address?.company}</span>
                )}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm h-10 font-medium text-gray-500">
                Address line 1 (Street, House no)
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEdit ? (
                  <TextField
                    className="w-full mt-0"
                    name="addressLine"
                    label=""
                  />
                ) : (
                  <span className="flex-grow">{address?.addressLine}</span>
                )}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm h-10 font-medium text-gray-500">
                Address line 2
              </dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {isEdit ? (
                  <TextField
                    className="w-full mt-0"
                    name="addressLine2"
                    label=""
                  />
                ) : (
                  <span className="flex-grow">{address?.addressLine2}</span>
                )}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-2 divide-y divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 ">
                <dt className="text-sm h-10 font-medium text-gray-500">
                  Region
                </dt>

                <dd className="mt-1 text-sm text-gray-900">
                  {isEdit ? (
                    <TextField
                      className="w-full mt-0"
                      name="regionCode"
                      label=""
                    />
                  ) : (
                    address?.regionCode
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Postal/ZIP code
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {isEdit ? (
                    <TextField
                      className="w-full mt-0"
                      name="postalCode"
                      label=""
                    />
                  ) : (
                    address?.postalCode
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm h-10 font-medium text-gray-500">City</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {isEdit ? (
                    <TextField className="w-full mt-0" name="city" label="" />
                  ) : (
                    address?.city
                  )}
                </dd>
              </div>
              <div className="pt-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Country code
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {isEdit ? (
                    <TextField
                      className="w-full mt-0"
                      name="countryCode"
                      label=""
                    />
                  ) : (
                    address?.countryCode
                  )}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </Form>
  );
};

export default ProfileView;

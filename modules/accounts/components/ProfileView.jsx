import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { format } from 'date-fns';
import Image from 'next/image';
import DatePickerField from '../../forms/components/DatePickerField';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useUpdateUserAvatar from '../hooks/useUpdateUserAvatar';
import useUpdateUserProfile from '../hooks/useUpdateUserProfile';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';

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
  const updateProfilePhotoMessage = formatMessage({
    id: 'photo_updated',
    defaultMessage: 'Profile Photo updated successfully!',
  });
  const onUpdateAvatar = async ({ target }) => {
    const [file] = target.files;
    await updateUserAvatar({
      userId: _id,
      avatar: file,
      successMessage: updateProfilePhotoMessage,
    });

    return true;
  };

  const successMessage = formatMessage({
    id: 'profile_updated',
    defaultMessage: 'Profile updated successfully!',
  });
  const form = useForm({
    submit: onUpdateProfile,
    successMessage,
    initialValues: {
      ...profile,
      ...profile?.address,
    },
  });

  return (
    <Form form={form}>
      <div className="mt-5 overflow-hidden border-b rounded-md">
        <div className="lg:grid lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="space-y-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {formatMessage({
                  id: 'profile',
                  defaultMessage: 'Profile',
                })}
              </h3>
              <p className="max-w-2xl text-sm text-gray-500">
                {formatMessage({
                  id: 'profile_notice',
                  defaultMessage:
                    'This information will be displayed publicly so be careful what you share.',
                })}
              </p>
            </div>
            <span className=" pt-4 flex-shrink-0 flex items-start space-x-4">
              <button
                onClick={() => setIsEdit(!isEdit)}
                type="button"
                className={classNames(
                  isEdit
                    ? 'text-red-600 hover:text-red-500  focus:ring-red-500'
                    : 'text-white-600 focus:ring-purple-500',
                  'bg-indigo-700 text-white py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
                )}
              >
                {isEdit
                  ? formatMessage({
                      id: 'cancel',
                      defaultMessage: 'Cancel',
                    })
                  : formatMessage({
                      id: 'update_profile',
                      defaultMessage: 'Update profile',
                    })}
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
                    {formatMessage({
                      id: 'save',
                      defaultMessage: 'Save',
                    })}
                  </button>
                </>
              )}
            </span>
          </div>
          <div className="col-span-2 lg:w-full ml-auto shadow-md border-gray-200  bg-white px-8">
            <dl className="py-4 divide-y divide-gray-200">
              <div className="py-4 sm:py-2 sm:grid sm:grid-cols-1">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'photo',
                    defaultMessage: 'Photo',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm space-x-5 items-center text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="">
                    <input
                      onChange={onUpdateAvatar}
                      multiple={false}
                      ref={fileInputRef}
                      type="file"
                      hidden
                    />
                    {avatar ? (
                      <Image
                        src={avatar?.url}
                        loader={defaultNextImageLoader}
                        width={100}
                        height={100}
                        alt={formatMessage({
                          id: 'unchained_logo',
                          defaultMessage: 'Unchained Logo',
                        })}
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
                      {formatMessage({
                        id: 'change',
                        defaultMessage: 'Change',
                      })}
                    </button>
                  </span>
                </dd>
              </div>

              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4">
                <dt className="text-sm h-10 font-medium text-gray-500">
                  {formatMessage({
                    id: 'name',
                    defaultMessage: 'Name',
                  })}
                </dt>
                <dd className="mt-1 py-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEdit ? (
                    <TextField
                      className="w-full mt-0"
                      name="displayName"
                      required
                      label={formatMessage({
                        id: 'displayName',
                        defaultMessage: 'Display Name',
                      })}
                      hideLabel
                    />
                  ) : (
                    <span className="flex-grow">{name}</span>
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4">
                <dt className="text-sm h-10 font-medium text-gray-500">
                  {formatMessage({
                    id: 'username',
                    defaultMessage: 'Username',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className="flex-grow">{username}</span>
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4">
                <dt className="text-sm h-10 font-medium text-gray-500">
                  {formatMessage({
                    id: 'gender',
                    defaultMessage: 'Gender',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEdit ? (
                    <SelectField
                      className="w-full mt-0"
                      label={formatMessage({
                        id: 'gender',
                        defaultMessage: 'Gender',
                      })}
                      hideLabel
                      name="gender"
                      options={{
                        M: formatMessage({
                          id: 'male',
                          defaultMessage: 'Male',
                        }),
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
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4">
                <dt className="text-sm h-10 font-medium text-gray-500">
                  {formatMessage({
                    id: 'birthday',
                    defaultMessage: 'Birthday',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEdit ? (
                    <DatePickerField
                      label={formatMessage({
                        id: 'birthday',
                        defaultMessage: 'Birthday',
                      })}
                      hideLabel
                      className="w-full mt-0"
                      name="birthday"
                    />
                  ) : (
                    <span className="flex-grow">
                      {profile.birthday
                        ? format(new Date(profile.birthday), 'P')
                        : 'n/a'}
                    </span>
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4">
                <dt className="text-sm h-10 font-medium text-gray-500">
                  Phone
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEdit ? (
                    <TextField
                      className="w-full mt-0"
                      name="phoneMobile"
                      label={formatMessage({
                        id: 'mobile',
                        defaultMessage: 'Mobile',
                      })}
                      hideLabel
                    />
                  ) : (
                    <span className="flex-grow">{profile?.phoneMobile}</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="my-7 pt-3 border-t lg:grid lg:grid-cols-3">
          <div className="space-y-1 col-span-1 py-3 lg:py-0 ">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {formatMessage({
                id: 'address',
                defaultMessage: 'Address',
              })}
            </h3>
            <p className="max-w-2xl text-sm text-gray-500">
              {formatMessage({
                id: 'address_notice',
                defaultMessage:
                  'This information will be displayed publicly so be careful what you share.',
              })}
            </p>
          </div>

          <div className="col-span-2 w-full lg:w-full lg:ml-auto shadow-md border-gray-200  bg-white px-8 py-6">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols0-4 sm:gap-4">
                <dt className="text-sm h-10 font-medium text-gray-500">
                  {formatMessage({
                    id: 'full_name',
                    defaultMessage: 'Full name',
                  })}
                </dt>
                <dd className="mt-1  flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEdit ? (
                    <div className=" flex w-full">
                      <TextField
                        className="w-full mt-0"
                        name="firstName"
                        label={formatMessage({
                          id: 'first_name',
                          defaultMessage: 'First name',
                        })}
                        hideLabel
                        placeholder="First Name"
                      />{' '}
                      <TextField
                        className="ml-2 w-full mt-0"
                        name="lastName"
                        label={formatMessage({
                          id: 'last_Name',
                          defaultMessage: 'Last name',
                        })}
                        hideLabel
                        placeholder="Last Name"
                      />
                    </div>
                  ) : (
                    <span className="flex-grow">
                      {address?.firstName} {address?.lastName}{' '}
                    </span>
                  )}
                </dd>
              </div>
              <div className=" py-4 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4">
                <dt className="text-sm h-10 font-medium text-gray-500">
                  {formatMessage({
                    id: 'company',
                    defaultMessage: 'Company',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEdit ? (
                    <TextField
                      className="w-full mt-0"
                      name="company"
                      label={formatMessage({
                        id: 'company',
                        defaultMessage: 'Company',
                      })}
                      hideLabel
                    />
                  ) : (
                    <span className="flex-grow">{address?.company}</span>
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols0-4 sm:gap-4">
                <dt className="text-sm h-10 font-medium text-gray-500">
                  {formatMessage({
                    id: 'address_line_1',
                    defaultMessage: 'Address line 1 (Street, House no)',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEdit ? (
                    <TextField
                      className="w-full mt-0"
                      name="addressLine"
                      label={formatMessage({
                        id: 'address_line_1',
                        defaultMessage: 'Address line 1 (Street, House no)',
                      })}
                      hideLabel
                    />
                  ) : (
                    <span className="flex-grow">{address?.addressLine}</span>
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols0-4 sm:gap-4">
                <dt className="text-sm h-10 font-medium text-gray-500">
                  {formatMessage({
                    id: 'address_line_2',
                    defaultMessage: 'Address line 2',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEdit ? (
                    <TextField
                      className="w-full mt-0"
                      name="addressLine2"
                      label={formatMessage({
                        id: 'address_line_2',
                        defaultMessage: 'Address line 2',
                      })}
                      hideLabel
                    />
                  ) : (
                    <span className="flex-grow">{address?.addressLine2}</span>
                  )}
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-2 divide-y divide-gray-200">
                <div className="pt-2 pb-2 sm:grid sm:grid-cols-2 ">
                  <dt className="mt-3 text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'region',
                      defaultMessage: 'Region',
                    })}
                  </dt>

                  <dd className="mt-1 flex text-sm text-gray-900">
                    {isEdit ? (
                      <TextField
                        className="w-full mt-0"
                        name="regionCode"
                        label={formatMessage({
                          id: 'region_Code',
                          defaultMessage: 'Region',
                        })}
                        hideLabel
                      />
                    ) : (
                      address?.regionCode
                    )}
                  </dd>
                </div>

                <div className="pt-2 sm:grid sm:grid-cols0-2">
                  <dt className="mt-3 text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'postal_code',
                      defaultMessage: 'Postal/ZIP code',
                    })}
                  </dt>
                  <dd className="mt-1 w-full text-sm text-gray-900">
                    {isEdit ? (
                      <TextField
                        className="w-full mt-0"
                        name="postalCode"
                        label={formatMessage({
                          id: 'postal_code',
                          defaultMessage: 'Postal/ZIP code',
                        })}
                        hideLabel
                      />
                    ) : (
                      address?.postalCode
                    )}
                  </dd>
                </div>
                <div className="pt-2 sm:grid sm:grid-cols-2">
                  <dt className="mt-3 text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'city',
                      defaultMessage: 'City',
                    })}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {isEdit ? (
                      <TextField
                        className="w-full mt-0"
                        name="city"
                        label={formatMessage({
                          id: 'city',
                          defaultMessage: 'City',
                        })}
                        hideLabel
                      />
                    ) : (
                      address?.city
                    )}
                  </dd>
                </div>
                <div className="pt-2 sm:grid sm:grid-cols0-2">
                  <dt className="mt-3 text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'country_code',
                      defaultMessage: 'Country code',
                    })}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {isEdit ? (
                      <TextField
                        className="w-full mt-0"
                        name="countryCode"
                        label={formatMessage({
                          id: 'country_code',
                          defaultMessage: 'Country code',
                        })}
                        hideLabel
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
      </div>
    </Form>
  );
};

export default ProfileView;

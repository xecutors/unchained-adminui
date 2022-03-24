import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Image from 'next/image';
import DatePickerField from '../../forms/components/DatePickerField';
import Form from '../../forms/components/Form';
import SelectField from '../../forms/components/SelectField';
import TextField from '../../forms/components/TextField';
import useForm from '../../forms/hooks/useForm';
import useUpdateUserAvatar from '../hooks/useUpdateUserAvatar';
import useUpdateUserProfile from '../hooks/useUpdateUserProfile';
import defaultNextImageLoader from '../../common/utils/defaultNextImageLoader';
import useFormatDateTime from '../../common/utils/useFormatDateTime';

const ProfileView = ({ profile = {}, avatar, name, _id }) => {
  const { address } = profile || {};
  const fileInputRef = useRef();
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
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

  const FormButton = ({ className }) => {
    return (
      <span
        className={classNames(
          'ml-1 flex flex-shrink-0 items-center space-x-4 pt-4',
          className,
        )}
      >
        <button
          onClick={() => setIsEdit(!isEdit)}
          type="button"
          className={classNames(
            isEdit
              ? 'bg-gray-200 text-white'
              : 'text-white-600 focus:ring-indigo-700',
            'rounded-md bg-indigo-700 py-2 px-4 font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
          )}
        >
          {isEdit
            ? formatMessage({
                id: 'cancel',
                defaultMessage: 'Cancel',
              })
            : formatMessage({
                id: 'update_profile',
                defaultMessage: 'Update profile / address',
              })}
        </button>
        {isEdit && (
          <>
            <button
              type="submit"
              className="rounded-md bg-indigo-700 py-2 px-4 font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {formatMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
            </button>
          </>
        )}
      </span>
    );
  };

  const CancelSaveButton = () => {
    return (
      isEdit && (
        <>
          <button
            onClick={() => setIsEdit(!isEdit)}
            type="button"
            className={classNames(
              'focus:ring-indigo-500',
              'inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
            )}
          >
            {formatMessage({
              id: 'cancel',
              defaultMessage: 'Cancel',
            })}
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-700 py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {formatMessage({
              id: 'save',
              defaultMessage: 'Save',
            })}
          </button>
        </>
      )
    );
  };

  return (
    <Form form={form}>
      <div className="mt-6 overflow-hidden rounded-md border-b">
        <div className="lg:grid lg:grid-cols-3">
          <div className="mb-5 lg:col-span-1 lg:pr-5">
            <div className="space-y-2">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
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
            <FormButton />
          </div>

          <div className="col-span-2 ml-auto border-gray-200 bg-white px-8 shadow-md lg:w-full">
            <div className="divide-y divide-gray-200 py-4">
              <div className="py-4 sm:grid sm:py-2">
                <label className="text-gray-70 block text-sm font-medium">
                  {formatMessage({
                    id: 'photo',
                    defaultMessage: 'Photo',
                  })}
                </label>
                <div className="mt-1 flex items-center space-x-5 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
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
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
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
                  <span className="mt-1 ml-4 flex flex-shrink-0 items-start space-x-4">
                    <button
                      onClick={() => fileInputRef.current.click()}
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {formatMessage({
                        id: 'change',
                        defaultMessage: 'Change',
                      })}
                    </button>
                  </span>
                </div>
              </div>

              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <label className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'displayName',
                    defaultMessage: 'Display Name',
                  })}
                </label>
                <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  {isEdit ? (
                    <TextField
                      className="mt-0 w-full"
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
                </div>
              </div>

              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <label className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'gender',
                    defaultMessage: 'Gender',
                  })}
                </label>
                <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  {isEdit ? (
                    <SelectField
                      className="mt-0 w-full"
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
                    <span className="flex-grow">
                      {profile?.gender || 'n/a'}
                    </span>
                  )}
                </div>
              </div>

              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <label className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'birthday',
                    defaultMessage: 'Birthday',
                  })}
                </label>
                <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  {isEdit ? (
                    <DatePickerField
                      label={formatMessage({
                        id: 'birthday',
                        defaultMessage: 'Birthday',
                      })}
                      hideLabel
                      className="mt-0 w-full"
                      name="birthday"
                    />
                  ) : (
                    <span className="flex-grow">
                      {profile.birthday
                        ? formatDateTime(profile.birthday)
                        : 'n/a'}
                    </span>
                  )}
                </div>
              </div>

              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <label className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'mobile',
                    defaultMessage: 'Mobile Phone',
                  })}
                </label>
                <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  {isEdit ? (
                    <TextField
                      className="mt-0 w-full"
                      name="phoneMobile"
                      label={formatMessage({
                        id: 'mobile',
                        defaultMessage: 'Mobile Phone',
                      })}
                      hideLabel
                    />
                  ) : (
                    <span className="flex-grow">
                      {profile?.phoneMobile || 'n/a'}
                    </span>
                  )}
                </div>
              </div>

              <div className="ml-1 flex flex-shrink-0 items-center justify-end space-x-4 py-4 pt-4">
                <CancelSaveButton className="justify-end" />
              </div>
            </div>
          </div>
        </div>

        <div className="my-7 border-t pt-6 lg:grid lg:grid-cols-3">
          <div className="col-span-1 space-y-1 py-3 lg:py-0 ">
            <div className="space-y-2">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
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
            <FormButton />
          </div>

          <div className="col-span-2 w-full border-gray-200 bg-white px-8 py-6  shadow-md lg:ml-auto lg:w-full">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <label className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'full_name',
                    defaultMessage: 'Full name',
                  })}
                </label>
                <div className="flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {isEdit ? (
                    <div className="flex w-full">
                      <TextField
                        className="mt-0 w-full"
                        name="firstName"
                        label={formatMessage({
                          id: 'first_name',
                          defaultMessage: 'First name',
                        })}
                        hideLabel
                        placeholder={formatMessage({
                          id: 'first_name',
                          defaultMessage: 'First name',
                        })}
                      />
                      <TextField
                        className="ml-2 mt-0 w-full"
                        name="lastName"
                        label={formatMessage({
                          id: 'last_Name',
                          defaultMessage: 'Last name',
                        })}
                        hideLabel
                        placeholder={formatMessage({
                          id: 'last_Name',
                          defaultMessage: 'Last name',
                        })}
                      />
                    </div>
                  ) : (
                    <span className="flex-grow">
                      {address?.firstName} {address?.lastName}{' '}
                    </span>
                  )}
                </div>
              </div>
              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <label className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'company',
                    defaultMessage: 'Company',
                  })}
                </label>
                <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  {isEdit ? (
                    <TextField
                      className="mt-0 w-full"
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
                </div>
              </div>
              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <label className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'address_line_1',
                    defaultMessage: 'Address line 1 (Street, House no)',
                  })}
                </label>
                <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  {isEdit ? (
                    <TextField
                      className="mt-0 w-full"
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
                </div>
              </div>
              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <label className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'address_line_2',
                    defaultMessage: 'Address line 2',
                  })}
                </label>
                <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  {isEdit ? (
                    <TextField
                      className="mt-0 w-full"
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
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-2 divide-y divide-gray-200 sm:grid-cols-2">
                <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                  <label className="text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'region',
                      defaultMessage: 'Region',
                    })}
                  </label>

                  <div className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                    {isEdit ? (
                      <TextField
                        className="mt-0 w-full"
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
                  </div>
                </div>

                <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                  <label className="text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'postal_code',
                      defaultMessage: 'Postal/ZIP code',
                    })}
                  </label>
                  <div className="mt-1 w-full text-sm text-gray-900 sm:mt-0">
                    {isEdit ? (
                      <TextField
                        className="mt-0 w-full"
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
                  </div>
                </div>

                <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                  <label className="text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'city',
                      defaultMessage: 'City',
                    })}
                  </label>
                  <div className="mt-1 text-sm text-gray-900 sm:mt-0">
                    {isEdit ? (
                      <TextField
                        className="mt-0 w-full"
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
                  </div>
                </div>

                <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                  <label className="text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'country_code',
                      defaultMessage: 'Country code',
                    })}
                  </label>
                  <div className="mt-1 text-sm text-gray-900 sm:mt-0">
                    {isEdit ? (
                      <TextField
                        className="mt-0 w-full"
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
                  </div>
                </div>
              </div>

              <div className="ml-1 flex flex-shrink-0 items-center justify-end space-x-4 py-4 pt-4">
                <CancelSaveButton />
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ProfileView;

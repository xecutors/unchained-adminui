import { useEffect, useRef, useState } from 'react';
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
import SaveAndCancelButtons from '../../common/components/SaveAndCancelButtons';
import AddressFields from './AddressFields';
import useCurrentRoles from '../hooks/useCurrentRoles';
import ACTION_ROLES from '../../common/data/roles';

const ProfileView = ({ profile = {}, avatar, _id }) => {
  const { address } = profile || {};
  const fileInputRef = useRef();
  const { formatMessage } = useIntl();
  const { formatDateTime } = useFormatDateTime();
  const { updateUserProfile } = useUpdateUserProfile();
  const { updateUserAvatar } = useUpdateUserAvatar();
  const { hasRole } = useCurrentRoles();

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
      birthday: '',
      displayName: null,
      gender: null,
      phoneMobile: null,
      firstName: null,
      lastName: null,
      city: null,
      company: null,
      addressLine: null,
      addressLine2: null,
      postalCode: null,
      countryCode: null,
      regionCode: null,
    },
  });

  useEffect(() => {
    if (Object.keys(profile).length)
      form.formik.setValues({
        birthday: profile?.birthday,
        displayName: profile?.displayName,
        gender: profile?.gender,
        phoneMobile: profile?.phoneMobile,
        firstName: address.firstName,
        lastName: address.lastName,
        city: address.city,
        company: address.company,
        addressLine: address.addressLine,
        addressLine2: address.addressLine2,
        postalCode: address.postalCode,
        countryCode: address.countryCode,
        regionCode: address.regionCode,
      });
  }, [profile]);

  console.log(profile);
  return (
    <Form form={form}>
      <div className="mt-6 overflow-hidden rounded-md">
        <div className="lg:grid lg:grid-cols-3">
          <div className="mb-5 lg:col-span-1 lg:pr-5">
            <div className="space-y-2">
              <h3 className="text-lg font-medium leading-6 text-slate-900">
                {formatMessage({
                  id: 'profile',
                  defaultMessage: 'Profile',
                })}
              </h3>
              <p className="max-w-2xl text-sm text-slate-500">
                {formatMessage({
                  id: 'profile_notice',
                  defaultMessage:
                    'This information will be displayed publicly so be careful what you share.',
                })}
              </p>
            </div>
            {hasRole(ACTION_ROLES.users.updateProfile) && (
              <SaveAndCancelButtons
                showSubmit={isEdit}
                onCancel={() => setIsEdit(!isEdit)}
                showCancel
                cancelText={
                  isEdit
                    ? formatMessage({
                        id: 'cancel',
                        defaultMessage: 'Cancel',
                      })
                    : formatMessage({
                        id: 'update_profile',
                        defaultMessage: 'Update profile / address',
                      })
                }
              />
            )}
          </div>

          <div className="col-span-2 ml-auto rounded-md bg-white px-6 shadow lg:w-full">
            <div className="py-4">
              <div className="py-4 sm:grid sm:py-2">
                <label className="text-slate-70 block text-sm font-medium">
                  {formatMessage({
                    id: 'photo',
                    defaultMessage: 'Photo',
                  })}
                </label>
                <div className="mt-1 flex items-center space-x-5 text-sm text-slate-900 sm:col-span-2 sm:mt-0">
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
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-slate-100">
                        <svg
                          className="h-full w-full text-slate-300"
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
                      className="rounded-md border border-slate-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {formatMessage({
                        id: 'change',
                        defaultMessage: 'Change',
                      })}
                    </button>
                  </span>
                </div>
              </div>

              <div className="py-4 sm:grid sm:gap-1 sm:py-1">
                <label className="text-sm font-medium text-slate-500">
                  {!isEdit &&
                    formatMessage({
                      id: 'displayName',
                      defaultMessage: 'Display Name',
                    })}
                </label>
                <div className="mt-1 flex text-sm text-slate-900 sm:mt-0">
                  {isEdit ? (
                    <TextField
                      className="mt-0 w-full"
                      name="displayName"
                      required
                      label={formatMessage({
                        id: 'displayName',
                        defaultMessage: 'Display Name',
                      })}
                      placeholder={formatMessage({
                        id: 'displayName',
                        defaultMessage: 'Display Name',
                      })}
                    />
                  ) : (
                    <span className="flex-grow">{profile?.displayName}</span>
                  )}
                </div>
              </div>

              <div className="py-4 sm:grid sm:gap-1 sm:py-1">
                <label className="text-sm font-medium text-slate-500">
                  {!isEdit &&
                    formatMessage({
                      id: 'gender',
                      defaultMessage: 'Gender',
                    })}
                </label>
                <div className="mt-1 flex text-sm text-slate-900 sm:mt-0">
                  {isEdit ? (
                    <SelectField
                      className="mt-0 w-full"
                      label={formatMessage({
                        id: 'gender',
                        defaultMessage: 'Gender',
                      })}
                      placeholder={formatMessage({
                        id: 'gender',
                        defaultMessage: 'Gender',
                      })}
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

              <div className="py-4 sm:grid sm:gap-1 sm:py-1">
                <label className="text-sm font-medium text-slate-500">
                  {!isEdit &&
                    formatMessage({
                      id: 'birthday',
                      defaultMessage: 'Birthday',
                    })}
                </label>
                <div className="mt-1 flex text-sm text-slate-900 sm:mt-0">
                  {isEdit ? (
                    <DatePickerField
                      label={formatMessage({
                        id: 'birthday',
                        defaultMessage: 'Birthday',
                      })}
                      placeholder={formatMessage({
                        id: 'birthday',
                        defaultMessage: 'Birthday',
                      })}
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

              <div className="py-4 sm:grid sm:gap-1 sm:py-1">
                <label className="text-sm font-medium text-slate-500">
                  {!isEdit &&
                    formatMessage({
                      id: 'mobile_phone',
                      defaultMessage: 'Mobile phone',
                    })}
                </label>
                <div className="mt-1 flex text-sm text-slate-900 sm:mt-0">
                  {isEdit ? (
                    <TextField
                      className="mt-0 w-full"
                      name="phoneMobile"
                      label={formatMessage({
                        id: 'mobile_phone',
                        defaultMessage: 'Mobile phone',
                      })}
                      placeholder={formatMessage({
                        id: 'mobile_phone',
                        defaultMessage: 'Mobile phone',
                      })}
                    />
                  ) : (
                    <span className="flex-grow">
                      {profile?.phoneMobile || 'n/a'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="border-t border-t-indigo-50 -mx-6 bg-slate-50 flex flex-shrink-0 items-center justify-end space-x-4">
              {isEdit ? (
                <SaveAndCancelButtons onCancel={() => setIsEdit(!isEdit)} />
              ) : null}
            </div>
          </div>
        </div>

        <div className="my-7 border-t pt-6 lg:grid lg:grid-cols-3">
          <div className="col-span-1 space-y-1 py-3 lg:py-0 ">
            <div className="space-y-2">
              <h3 className="text-lg font-medium leading-6 text-slate-900">
                {formatMessage({
                  id: 'address',
                  defaultMessage: 'Address',
                })}
              </h3>
              <p className="max-w-2xl text-sm text-slate-500">
                {formatMessage({
                  id: 'address_notice',
                  defaultMessage:
                    'This information will be displayed publicly so be careful what you share.',
                })}
              </p>
            </div>
            {hasRole(ACTION_ROLES.users.updateProfile) && (
              <SaveAndCancelButtons
                showSubmit={isEdit}
                onCancel={() => setIsEdit(!isEdit)}
                showCancel
                cancelText={
                  isEdit
                    ? formatMessage({
                        id: 'cancel',
                        defaultMessage: 'Cancel',
                      })
                    : formatMessage({
                        id: 'update_profile',
                        defaultMessage: 'Update profile / address',
                      })
                }
              />
            )}
          </div>

          <div className="col-span-2 w-full border-slate-200 bg-white px-6 py-6 rounded-md shadow lg:ml-auto lg:w-full">
            <AddressFields
              isEdit={isEdit}
              address={address}
              setIsEdit={setIsEdit}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ProfileView;

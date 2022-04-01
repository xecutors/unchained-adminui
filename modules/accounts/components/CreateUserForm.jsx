import { useIntl } from 'react-intl';

import { useRouter } from 'next/router';
import useForm from '../../forms/hooks/useForm';
import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import SelectField from '../../forms/components/SelectField';
import DatePickerField from '../../forms/components/DatePickerField';
import EmailField from '../../forms/components/EmailField';
import PasswordField from '../../forms/components/PasswordField';
import SaveAndCancelButtons from '../../common/components/SaveAndCancelButtons';

const CreateUserForm = ({ onSubmit, onSubmitSuccess }) => {
  const { formatMessage } = useIntl();
  const router = useRouter();
  const successMessage = formatMessage({
    id: 'user_profile_created',
    defaultMessage: 'User profile created successfully!',
  });
  const form = useForm({
    submit: onSubmit,
    onSubmitSuccess,
    successMessage,
    initialValues: {
      displayName: '',
      gender: '',
      birthday: new Date(),
      phoneMobile: '',
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      company: '',
      addressLine: '',
      addressLine2: '',
      postalCode: '',
      regionCode: '',
      countryCode: '',
      city: '',
    },
  });
  const back = () => {
    router.back();
  };

  return (
    <>
      <Form form={form} className="max-w-6xl">
        <div className="space-y-4 overflow-hidden rounded-md border-b lg:grid lg:grid-cols-3">
          <div className="flex justify-between pt-5 sm:col-span-1">
            <div className="space-y-1">
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
            <span className="ml-4 flex flex-shrink-0 items-start space-x-4" />
          </div>

          <div className="mt-1 rounded-md border-gray-200 bg-white pt-5 shadow lg:col-span-2">
            <div className="px-6">
              <div className="py-2 sm:grid sm:gap-1">
                <TextField
                  className="mt-0 w-full"
                  name="username"
                  required
                  label={formatMessage({
                    id: 'username',
                    defaultMessage: 'Username',
                  })}
                  placeholder={formatMessage({
                    id: 'username',
                    defaultMessage: 'Username',
                  })}
                />
              </div>

              <div className="py-2 sm:grid sm:gap-1">
                <EmailField
                  className="mt-0 w-full"
                  name="email"
                  required
                  label={formatMessage({
                    id: 'email',
                    defaultMessage: 'Email',
                  })}
                  placeholder={formatMessage({
                    id: 'email',
                    defaultMessage: 'Email',
                  })}
                />
              </div>

              <div className="py-2 sm:grid sm:gap-1">
                <PasswordField
                  className="mt-0 w-full"
                  name="password"
                  required
                  label={formatMessage({
                    id: 'password',
                    defaultMessage: 'Password',
                  })}
                />
              </div>
              <div className="py-2 sm:grid sm:gap-1">
                <TextField
                  className="mt-0 w-full"
                  name="displayName"
                  label={formatMessage({
                    id: 'display_name',
                    defaultMessage: 'Display name',
                  })}
                  placeholder={formatMessage({
                    id: 'display_name',
                    defaultMessage: 'Display name',
                  })}
                />
              </div>

              <div className="py-2 sm:grid sm:gap-1">
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
              </div>
              <div className="py-2 sm:grid sm:gap-1">
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
              </div>
              <div className="py-2 sm:grid sm:gap-1">
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
              </div>
            </div>
            <div className="border-t-indigo-50 border-t bg-slate-50 sm:px-15 mt-5">
              <SaveAndCancelButtons className="justify-end" onCancel={back} />
            </div>
          </div>

          <div className="mb-6 w-full lg:col-span-3" />

          <div className="flex justify-between pt-6 lg:col-span-1">
            <div className="space-y-1 ">
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
          </div>

          <div className="rounded-md bg-white pt-5 mb-5 shadow lg:col-span-2">
            <div className="px-5">
              <div className="py-2 sm:grid sm:gap-1">
                <div className="mt-1 flex text-sm text-slate-900 sm:mt-0">
                  <div className="flex w-full">
                    <TextField
                      className="mt-0 w-full"
                      name="firstName"
                      label={formatMessage({
                        id: 'first_name',
                        defaultMessage: 'First name',
                      })}
                      l
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
                      placeholder={formatMessage({
                        id: 'last_Name',
                        defaultMessage: 'Last name',
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="py-2 sm:grid sm:gap-1">
                <TextField
                  className="mt-0 w-full"
                  name="company"
                  label={formatMessage({
                    id: 'company',
                    defaultMessage: 'Company',
                  })}
                  placeholder={formatMessage({
                    id: 'company',
                    defaultMessage: 'Company',
                  })}
                />
              </div>
              <div className="py-2 sm:grid sm:gap-1">
                <TextField
                  className="mt-0 w-full"
                  name="addressLine"
                  label={formatMessage({
                    id: 'address_line_1',
                    defaultMessage: 'Address line 1 (Street, House no)',
                  })}
                  placeholder={formatMessage({
                    id: 'address_line_1',
                    defaultMessage: 'Address line 1 (Street, House no)',
                  })}
                />
              </div>
              <div className="py-2 sm:grid sm:gap-1">
                <TextField
                  className="mt-0 w-full"
                  name="addressLine2"
                  label={formatMessage({
                    id: 'address_line_2',
                    defaultMessage: 'Address line 2',
                  })}
                  placeholder={formatMessage({
                    id: 'address_line_2',
                    defaultMessage: 'Address line 2',
                  })}
                />
              </div>

              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <div className="py-2 sm:grid sm:gap-1">
                  <TextField
                    className="mt-0 w-full"
                    name="regionCode"
                    label={formatMessage({
                      id: 'region_Code',
                      defaultMessage: 'Region',
                    })}
                    placeholder={formatMessage({
                      id: 'region_Code',
                      defaultMessage: 'Region',
                    })}
                  />
                </div>

                <div className="py-2 sm:grid sm:gap-1">
                  <TextField
                    className="mt-0 w-full"
                    name="postalCode"
                    label={formatMessage({
                      id: 'postal_code',
                      defaultMessage: 'Postal/ZIP code',
                    })}
                    placeholder={formatMessage({
                      id: 'postal_code',
                      defaultMessage: 'Postal/ZIP code',
                    })}
                  />
                </div>
                <div className="py-2 sm:grid sm:gap-1">
                  <TextField
                    className="mt-0 w-full"
                    name="city"
                    label={formatMessage({
                      id: 'city',
                      defaultMessage: 'City',
                    })}
                    placeholder={formatMessage({
                      id: 'city',
                      defaultMessage: 'City',
                    })}
                  />
                </div>
                <div className="py-2 sm:grid sm:gap-1">
                  <TextField
                    className="mt-0 w-full"
                    name="countryCode"
                    label={formatMessage({
                      id: 'country_code',
                      defaultMessage: 'Country code',
                    })}
                    placeholder={formatMessage({
                      id: 'country_code',
                      defaultMessage: 'Country code',
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="border border-indigo-50 bg-slate-50 sm:px-15 mt-5">
              <SaveAndCancelButtons className="justify-end" onCancel={back} />
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreateUserForm;

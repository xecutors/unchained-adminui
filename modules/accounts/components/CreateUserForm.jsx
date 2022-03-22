import { useIntl } from 'react-intl';
import useForm from '../../forms/hooks/useForm';
import Form from '../../forms/components/Form';
import TextField from '../../forms/components/TextField';
import SelectField from '../../forms/components/SelectField';
import DatePickerField from '../../forms/components/DatePickerField';
import EmailField from '../../forms/components/EmailField';
import PasswordField from '../../forms/components/PasswordField';
import FormErrors from '../../forms/components/FormErrors';
import SubmitButton from '../../forms/components/SubmitButton';

const CreateUserForm = ({ onSubmit, onSubmitSuccess }) => {
  const { formatMessage } = useIntl();
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

  return (
    <>
      <Form form={form} className="max-w-6xl">
        <div className="space-y-4 overflow-hidden rounded-md border-b lg:grid lg:grid-cols-3">
          <div className="flex justify-between pt-5 sm:col-span-1">
            <div className="space-y-1">
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
            <span className="ml-4 flex flex-shrink-0 items-start space-x-4" />
          </div>

          <div className="mt-1 rounded-md border-gray-200 bg-white px-4 py-5 lg:col-span-2">
            <dl className="divide-y divide-gray-200">
              <div className="py-2 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'username',
                    defaultMessage: 'Username',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  <TextField
                    className="mt-0 w-full"
                    name="username"
                    required
                    label={formatMessage({
                      id: 'username',
                      defaultMessage: 'Username',
                    })}
                    hideLabel
                  />
                </dd>
              </div>

              <div className="py-3 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'email',
                    defaultMessage: 'Email',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  <EmailField
                    className="mt-0 w-full"
                    name="email"
                    required
                    label={formatMessage({
                      id: 'email',
                      defaultMessage: 'Email',
                    })}
                    hideLabel
                  />
                </dd>
              </div>

              <div className="py-3 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'password',
                    defaultMessage: 'Password',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  <PasswordField
                    className="mt-0 w-full"
                    name="password"
                    required
                    label={formatMessage({
                      id: 'password',
                      defaultMessage: 'Password',
                    })}
                    hideLabel
                  />
                </dd>
              </div>
              <div className="py-3 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'name',
                    defaultMessage: 'Display Name',
                  })}
                </dt>
                <dd className="mt-1 flex py-1 text-sm text-gray-900 sm:mt-0">
                  <TextField
                    className="mt-0 w-full"
                    name="displayName"
                    label={formatMessage({
                      id: 'display_name',
                      defaultMessage: 'Display Name',
                    })}
                    hideLabel
                  />
                </dd>
              </div>

              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'gender',
                    defaultMessage: 'Gender',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
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
                </dd>
              </div>
              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'birthday',
                    defaultMessage: 'Birthday',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  <DatePickerField
                    label={formatMessage({
                      id: 'birthday',
                      defaultMessage: 'Birthday',
                    })}
                    hideLabel
                    className="mt-0 w-full"
                    name="birthday"
                  />
                </dd>
              </div>
              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({ id: 'phone', defaultMessage: 'Phone' })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  <TextField
                    className="mt-0 w-full"
                    name="phoneMobile"
                    label={formatMessage({
                      id: 'mobile',
                      defaultMessage: 'Mobile',
                    })}
                    hideLabel
                  />
                </dd>
              </div>
            </dl>
          </div>

          <div className="sm:px-15  space-y-6 bg-gray-50 p-5 text-right lg:col-span-3 lg:p-6">
            <SubmitButton
              full
              label={formatMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
            />
          </div>

          <div className="mb-6 w-full border-t lg:col-span-3" />

          <div className="flex justify-between pt-6 lg:col-span-1">
            <div className="space-y-1 ">
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
          </div>

          <div className="rounded-md bg-white px-4 py-5 lg:col-span-2">
            <dl className="divide-y divide-gray-200">
              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'full_name',
                    defaultMessage: 'Full name',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  <div className="flex w-full">
                    <TextField
                      className="mt-0 w-full"
                      name="firstName"
                      label={formatMessage({
                        id: 'first_name',
                        defaultMessage: 'First name',
                      })}
                      hideLabel
                      placeholder="First Name"
                    />
                    <TextField
                      className="ml-2 mt-0 w-full"
                      name="lastName"
                      label={formatMessage({
                        id: 'last_Name',
                        defaultMessage: 'Last name',
                      })}
                      hideLabel
                      placeholder="Last Name"
                    />
                  </div>
                </dd>
              </div>
              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'company',
                    defaultMessage: 'Company',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  <TextField
                    className="mt-0 w-full"
                    name="company"
                    label={formatMessage({
                      id: 'company',
                      defaultMessage: 'Company',
                    })}
                    hideLabel
                  />
                </dd>
              </div>
              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'address_line_1',
                    defaultMessage: 'Address line 1 (Street, House no)',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  <TextField
                    className="mt-0 w-full"
                    name="addressLine"
                    label={formatMessage({
                      id: 'address_line_1',
                      defaultMessage: 'Address line 1 (Street, House no)',
                    })}
                    hideLabel
                  />
                </dd>
              </div>
              <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                <dt className="text-sm font-medium text-gray-500">
                  {formatMessage({
                    id: 'address_line_2',
                    defaultMessage: 'Address line 2',
                  })}
                </dt>
                <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                  <TextField
                    className="mt-0 w-full"
                    name="addressLine2"
                    label={formatMessage({
                      id: 'address_line_2',
                      defaultMessage: 'Address line 2',
                    })}
                    hideLabel
                  />
                </dd>
              </div>

              <div className="grid grid-cols-1 gap-x-2 divide-y divide-gray-200 sm:grid-cols-2">
                <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'region',
                      defaultMessage: 'Region',
                    })}
                  </dt>

                  <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0">
                    <TextField
                      className="mt-0 w-full"
                      name="regionCode"
                      label={formatMessage({
                        id: 'region_Code',
                        defaultMessage: 'Region',
                      })}
                      hideLabel
                    />
                  </dd>
                </div>

                <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'postal_code',
                      defaultMessage: 'Postal/ZIP code',
                    })}
                  </dt>
                  <dd className="mt-1 w-full text-sm text-gray-900 sm:mt-0">
                    <TextField
                      className="mt-0 w-full"
                      name="postalCode"
                      label={formatMessage({
                        id: 'postal_code',
                        defaultMessage: 'Postal/ZIP code',
                      })}
                      hideLabel
                    />
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'city',
                      defaultMessage: 'City',
                    })}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                    <TextField
                      className="mt-0 w-full"
                      name="city"
                      label={formatMessage({
                        id: 'city',
                        defaultMessage: 'City',
                      })}
                      hideLabel
                    />
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:gap-4 sm:py-5">
                  <dt className="text-sm font-medium text-gray-500">
                    {formatMessage({
                      id: 'country_code',
                      defaultMessage: 'Country code',
                    })}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                    <TextField
                      className="mt-0 w-full"
                      name="countryCode"
                      label={formatMessage({
                        id: 'country_code',
                        defaultMessage: 'Country code',
                      })}
                      hideLabel
                    />
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <FormErrors />

          <div className="sm:px-15  space-y-6 bg-gray-50 p-5 text-right lg:col-span-3 lg:p-6">
            <SubmitButton
              full
              label={formatMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
            />
          </div>
        </div>
      </Form>
    </>
  );
};

export default CreateUserForm;

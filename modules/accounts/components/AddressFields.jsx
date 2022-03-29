import { useIntl } from 'react-intl';
import SaveAndCancelButtons from '../../common/components/SaveAndCancelButtons';
import TextField from '../../forms/components/TextField';

const AddressFields = ({ isEdit, address, setIsEdit }) => {
  const { formatMessage } = useIntl();

  return (
    <dl className="divide-y divide-gray-200">
      <div className="py-4 sm:grid sm:gap-1 sm:py-5">
        {!isEdit && (
          <label className="text-sm font-medium text-gray-500">
            {formatMessage({
              id: 'full_name',
              defaultMessage: 'Full name',
            })}
          </label>
        )}
        <div className="flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
          {isEdit ? (
            <div className="flex w-full gap-2">
              <TextField
                className="w-full"
                labelClassName="text-sm font-medium text-gray-500"
                name="firstName"
                label={formatMessage({
                  id: 'first_name',
                  defaultMessage: 'First name',
                })}
                placeholder={formatMessage({
                  id: 'first_name',
                  defaultMessage: 'First name',
                })}
              />
              <TextField
                className="w-full"
                labelClassName="text-sm font-medium text-gray-500"
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
          ) : (
            <span className="flex-grow">
              {address?.firstName} {address?.lastName}{' '}
            </span>
          )}
        </div>
      </div>
      <div className="py-4 sm:grid sm:gap-1 sm:py-5">
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
      <div className="py-4 sm:grid sm:gap-1 sm:py-5">
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
      <div className="py-4 sm:grid sm:gap-1 sm:py-5">
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
        <div className="py-4 sm:grid sm:gap-1 sm:py-5">
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

        <div className="py-4 sm:grid sm:gap-1 sm:py-5">
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

        <div className="py-4 sm:grid sm:gap-1 sm:py-5">
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

        <div className="py-4 sm:grid sm:gap-1 sm:py-5">
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
        {isEdit ? (
          <SaveAndCancelButtons onCancel={() => setIsEdit(!isEdit)} />
        ) : null}
      </div>
    </dl>
  );
};

export default AddressFields;

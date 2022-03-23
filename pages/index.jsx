import { useIntl } from 'react-intl';
import Badge from '../modules/common/components/Badge';

const Home = ({ shopInfo }) => {
  const { formatMessage, locale } = useIntl();
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-10 text-center text-2xl text-gray-700">
            {formatMessage({
              id: 'system_information',
              defaultMessage: 'System Information',
            })}
          </h2>
        </div>

        <div className="mt-8 text-right sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <ul className="-my-5 divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {formatMessage({
                      id: 'engine_version',
                      defaultMessage: 'Engine version',
                    })}
                  </div>
                  <div className="min-w-0 flex-1">
                    <Badge text={shopInfo?.version} color="indigo" square />
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {formatMessage({
                      id: 'resolved_language',
                      defaultMessage: 'Resolved language',
                    })}
                  </div>
                  <div className="min-w-0 flex-1">
                    {(shopInfo?.language?.isoCode &&
                      new Intl.DisplayNames([locale], { type: 'language' }).of(
                        shopInfo?.language?.isoCode,
                      )) ||
                      shopInfo?.language?.name}{' '}
                    ({shopInfo?.language?.isoCode})
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {formatMessage({
                      id: 'resolved_country',
                      defaultMessage: 'Resolved country',
                    })}
                  </div>
                  <div className="min-w-0 flex-1">
                    {shopInfo?.country?.flagEmoji}
                    {(shopInfo?.country?.isoCode &&
                      new Intl.DisplayNames([locale], { type: 'region' }).of(
                        shopInfo?.country?.isoCode,
                      )) ||
                      shopInfo?.country?.name}{' '}
                    ({shopInfo?.country?.isoCode})
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {formatMessage({
                      id: 'default_currency',
                      defaultMessage: 'Default currency',
                    })}
                  </div>
                  <div className="min-w-0 flex-1">
                    {(shopInfo?.country?.defaultCurrency?.isoCode &&
                      new Intl.DisplayNames([locale], { type: 'currency' }).of(
                        shopInfo?.country?.defaultCurrency?.isoCode,
                      )) ||
                      shopInfo?.country?.defaultCurrency?.name}{' '}
                    ({shopInfo?.country?.defaultCurrency?.isoCode})
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {formatMessage({
                      id: 'your_roles',
                      defaultMessage: 'Your roles',
                    })}
                  </div>
                  <div className="min-w-0 flex-1">
                    {shopInfo?.userRoles?.map((role) => (
                      <Badge key={role} text={role} color="green" />
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

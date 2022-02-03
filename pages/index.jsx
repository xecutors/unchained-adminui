import { useIntl } from 'react-intl';
import Badge from '../modules/common/components/Badge';

const Home = ({ shopInfo }) => {
  const { formatMessage, locale } = useIntl();

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://unchained.shop/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.d34ce508.svg&w=256&q=75"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {formatMessage({
              id: 'system_information',
              defaultMessage: 'System Information',
            })}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <ul className="-my-5 divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {formatMessage({
                      id: 'engine_version',
                      defaultMessage: 'Engine Version',
                    })}
                  </div>
                  <div className="flex-1 min-w-0">
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
                  <div className="flex-1 min-w-0">
                    {shopInfo?.language?.isoCode}{' '}
                    {(shopInfo?.language?.isoCode &&
                      new Intl.DisplayNames([locale], { type: 'language' }).of(
                        shopInfo?.language?.isoCode,
                      )) ||
                      shopInfo?.language?.name}
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
                  <div className="flex-1 min-w-0">
                    {shopInfo?.country?.isoCode} {shopInfo?.country?.flagEmoji}
                    {(shopInfo?.country?.isoCode &&
                      new Intl.DisplayNames([locale], { type: 'region' }).of(
                        shopInfo?.country?.isoCode,
                      )) ||
                      shopInfo?.country?.name}
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
                  <div className="flex-1 min-w-0">
                    {shopInfo?.country?.defaultCurrency?.isoCode}{' '}
                    {(shopInfo?.country?.defaultCurrency?.isoCode &&
                      new Intl.DisplayNames([locale], { type: 'currency' }).of(
                        shopInfo?.country?.defaultCurrency?.isoCode,
                      )) ||
                      shopInfo?.country?.defaultCurrency?.name}
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {formatMessage({
                      id: 'user_roles',
                      defaultMessage: 'User roles',
                    })}
                  </div>
                  <div className="flex-1 min-w-0">
                    {shopInfo?.userRoles?.map((role) => (
                      <Badge text={role} color="green" />
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

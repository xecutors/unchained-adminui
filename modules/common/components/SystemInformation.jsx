import { useIntl } from 'react-intl';
import useShopInfo from '../hooks/useShopInfo';
import Badge from './Badge';
import Loading from './Loading';

const ShopInformation = () => {
  const { formatMessage, locale } = useIntl();
  const { shopInfo, loading } = useShopInfo();

  if (loading) return <Loading />;
  return (
    <>
      <h2 className="ml-4 text-xl text-slate-700">
        {formatMessage({
          id: 'system_information',
          defaultMessage: 'System Information',
        })}
      </h2>
      <div className="mt-2 text-right">
        <div className="bg-white p-4 shadow sm:rounded-lg sm:px-4">
          <ul className="-my-3 divide-y divide-slate-200">
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
                    new Intl.DisplayNames([locale], {
                      type: 'language',
                    }).of(shopInfo?.language?.isoCode)) ||
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
                    new Intl.DisplayNames([locale], {
                      type: 'currency',
                    }).of(shopInfo?.country?.defaultCurrency?.isoCode)) ||
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
    </>
  );
};

export default ShopInformation;

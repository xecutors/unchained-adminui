import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import AccountView from '../../modules/accounts/components/AccountView';
import ProfileView from '../../modules/accounts/components/ProfileView';
import UserOrders from '../../modules/accounts/components/UserOrders';
import useUser from '../../modules/accounts/hooks/useUser';

const getCurrentTab = (current, user) => {
  if (current === 'profile') return <ProfileView {...user} />;
  if (current === 'orders') return <UserOrders {...user} />;
  return <AccountView {...user} />;
};

const UserProfile = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { id } = query;

  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useUser({ userId: id });

  const userProfileSettingOptions = {
    profile: formatMessage({ id: 'profile', defaultMessage: 'Profile' }),
    account: formatMessage({ id: 'account', defaultMessage: 'Account' }),
    orders: formatMessage({ id: 'orders', defaultMessage: 'Orders' }),
    enrollment: formatMessage({
      id: 'enrollment',
      defaultMessage: 'Enrollment',
    }),
    payment_credentials: formatMessage({
      id: 'payment_credentials',
      defaultMessage: 'Payment credentials',
    }),

    logs: formatMessage({
      id: 'logs',
      defaultMessage: 'Logs',
    }),
  };

  return (
    <main>
      <div className="relative max-w-4xl md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-extrabold text-gray-900">Settings</h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0">
            <div className="py-6">
              <div className="lg:hidden">
                <label htmlFor="selected-tab" className="sr-only">
                  Select a tab
                </label>
                <select
                  onChange={(e) => setActiveTab(e.target.value)}
                  id="selected-tab"
                  name="selected-tab"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                >
                  {Object.entries(userProfileSettingOptions).map(
                    ([key, value]) => (
                      <option
                        key={`mobile-${key}`}
                        value={key}
                        selected={activeTab === key}
                      >
                        {value}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div className="hidden lg:block">
                <div className="border-b border-gray-200 al">
                  <nav className="-mb-px flex space-x-8">
                    {Object.entries(userProfileSettingOptions).map(
                      ([key, value]) => (
                        <a
                          onClick={() => setActiveTab(key)}
                          key={key}
                          href="#"
                          className={` ${
                            activeTab === key &&
                            'border-purple-500 text-purple-600'
                          }  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                          {value}
                        </a>
                      ),
                    )}
                  </nav>
                </div>
              </div>
              <div className="mt-10 divide-y divide-gray-200">
                {getCurrentTab(activeTab, user)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;

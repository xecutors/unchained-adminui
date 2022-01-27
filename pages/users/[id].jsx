import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import AccountView from '../../modules/accounts/components/AccountView';
import PaymentCredentialsView from '../../modules/accounts/components/PaymentCredentialsView';
import ProfileView from '../../modules/accounts/components/ProfileView';
import UserEnrollments from '../../modules/accounts/components/UserEnrollments';
import UserOrders from '../../modules/accounts/components/UserOrders';
import UserQuotations from '../../modules/accounts/components/UserQuotations';
import useUser from '../../modules/accounts/hooks/useUser';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

const getCurrentTab = (current, user) => {
  if (!user) return 'loading';
  if (current === 'profile') return <ProfileView {...user} />;
  if (current === 'orders') return <UserOrders {...user} />;
  if (current === 'quotations') return <UserQuotations {...user} />;
  if (current === 'enrollments') return <UserEnrollments {...user} />;
  if (current === 'payment_credentials')
    return <PaymentCredentialsView {...user} />;
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
    quotations: formatMessage({
      id: 'quotations',
      defaultMessage: 'Quotations',
    }),
    enrollments: formatMessage({
      id: 'enrollments',
      defaultMessage: 'Enrollments',
    }),
    payment_credentials: formatMessage({
      id: 'payment_credentials',
      defaultMessage: 'Payment credentials',
    }),
  };

  return (
    <div className=" max-w-4xl">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'users_setting_list_header',
          defaultMessage: 'Users setting',
        })}
      />
      <div className=" sm:px-6 md:px-0">
        <div className="py-6">
          <div className="lg:hidden">
            <label htmlFor="selected-tab" className="sr-only">
              {formatMessage({
                id: 'select_tab',
                defaultMessage: 'Select a tab',
              })}
            </label>

            <select
              onChange={(e) => setActiveTab(e.target.value)}
              id="selected-tab"
              name="selected-tab"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              value={activeTab}
            >
              {Object.entries(userProfileSettingOptions).map(([key, value]) => (
                <option key={`mobile-${key}`} value={key}>
                  {value}
                </option>
              ))}
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
                      className={` ${
                        activeTab === key && 'border-purple-500 text-purple-600'
                      }  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      {value}
                    </a>
                  ),
                )}
              </nav>
            </div>
          </div>
          <div className="mt-5">{getCurrentTab(activeTab, user)}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

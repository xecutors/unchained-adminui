import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import AccountView from '../../modules/accounts/components/AccountView';
import PaymentCredentialsView from '../../modules/accounts/components/PaymentCredentialsView';
import ProfileView from '../../modules/accounts/components/ProfileView';

import UserEnrollments from '../../modules/accounts/components/UserEnrollments';
import UserOrders from '../../modules/accounts/components/UserOrders';
import UserQuotations from '../../modules/accounts/components/UserQuotations';
import useUser from '../../modules/accounts/hooks/useUser';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import Loading from '../../modules/common/components/Loading';
import PageHeader from '../../modules/common/components/PageHeader';
import TabComponent from '../../modules/common/components/TabComponent';

const GetCurrentTab = ({ user, selectedView }) => {
  if (!user) return <Loading />;
  if (selectedView === 'profile') return <ProfileView {...user} />;
  if (selectedView === 'orders') return <UserOrders {...user} />;
  if (selectedView === 'quotations') return <UserQuotations {...user} />;
  if (selectedView === 'enrollments') return <UserEnrollments {...user} />;
  if (selectedView === 'payment_credentials')
    return <PaymentCredentialsView {...user} />;
  return <AccountView {...user} />;
};

const UserProfile = () => {
  const { formatMessage } = useIntl();
  const { query } = useRouter();
  const { id } = query;

  const { user } = useUser({ userId: id });

  const userProfileSettingOptions = [
    {
      id: 'profile',
      title: formatMessage({ id: 'profile', defaultMessage: 'Profile' }),
    },
    {
      id: 'account',
      title: formatMessage({ id: 'account', defaultMessage: 'Account' }),
    },
    {
      id: 'orders',
      title: formatMessage({ id: 'orders', defaultMessage: 'Orders' }),
    },
    {
      id: 'quotations',
      title: formatMessage({
        id: 'quotations',
        defaultMessage: 'Quotations',
      }),
    },
    {
      id: 'enrollments',
      title: formatMessage({
        id: 'enrollments',
        defaultMessage: 'Enrollments',
      }),
    },
    {
      id: 'payment_credentials',
      title: formatMessage({
        id: 'payment_credentials',
        defaultMessage: 'Payment credentials',
      }),
    },
  ];

  return (
    <div className=" max-w-6xl">
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'users_setting_list_header',
          defaultMessage: 'Users setting',
        })}
      />
      <TabComponent tabItems={userProfileSettingOptions} defaultTab="profile">
        <GetCurrentTab user={user} />
      </TabComponent>
    </div>
  );
};

export default UserProfile;

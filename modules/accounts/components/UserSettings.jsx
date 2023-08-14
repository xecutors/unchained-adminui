import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  LockClosedIcon,
  PaperAirplaneIcon,
  PuzzlePieceIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { useIntl } from 'react-intl';
import DisplayExtendedFields from '../../common/components/DisplayExtendedFields';
import DisplayUserLastLogs from '../../common/components/DisplayUserLastLogs';
import Loading from '../../common/components/Loading';
import Tab from '../../common/components/Tab';
import UserProductReviews from './UserProductReviews';
import AccountView from './AccountView';
import PaymentCredentialsView from './PaymentCredentialsView';
import ProfileView from './ProfileView';
import UserEnrollments from './UserEnrollments';
import UserOrders from './UserOrders';
import UserQuotations from './UserQuotations';
import UserTokens from './UserTokens';

const GetCurrentTab = ({ user, selectedView, ...extendedData }) => {
  if (!user) return <Loading />;
  if (selectedView === 'profile') return <ProfileView {...user} />;
  if (selectedView === 'account') return <AccountView {...user} />;
  if (selectedView === 'orders') return <UserOrders {...user} />;
  if (selectedView === 'quotations') return <UserQuotations {...user} />;
  if (selectedView === 'enrollments') return <UserEnrollments {...user} />;
  if (selectedView === 'reviews') return <UserProductReviews {...user} />;

  if (selectedView === 'payment_credentials')
    return <PaymentCredentialsView {...user} />;
  if (selectedView === 'tokens') return <UserTokens {...user} />;
  if (selectedView === 'extended') {
    return <DisplayExtendedFields data={extendedData} />;
  }
  if (selectedView === 'logs') {
    return <DisplayUserLastLogs {...user} />;
  }
  return <ProfileView {...user} />;
};
const UserSettings = ({ user, extendedData }) => {
  const { formatMessage } = useIntl();
  const userProfileSettingOptions = [
    {
      id: 'profile',
      title: formatMessage({ id: 'profile', defaultMessage: 'Profile' }),
      Icon: <UserIcon className="h-4 w-5" />,
    },
    {
      id: 'account',
      title: formatMessage({ id: 'account', defaultMessage: 'Account' }),
      Icon: <LockClosedIcon className="h-4 w-5" />,
    },
    {
      id: 'orders',
      title: formatMessage({ id: 'orders', defaultMessage: 'Orders' }),
      Icon: <ShoppingCartIcon className="h-4 w-5" />,
    },
    {
      id: 'quotations',
      title: formatMessage({
        id: 'quotations',
        defaultMessage: 'Quotations',
      }),
      Icon: <BanknotesIcon className="h-4 w-5" />,
    },
    {
      id: 'enrollments',
      title: formatMessage({
        id: 'enrollments',
        defaultMessage: 'Enrollments',
      }),
      Icon: <ClipboardDocumentListIcon className="h-4 w-5" />,
    },
    {
      id: 'payment_credentials',
      title: formatMessage({
        id: 'payment_credentials',
        defaultMessage: 'Payment credentials',
      }),
      Icon: <CreditCardIcon className="h-4 w-5" />,
    },
    {
      id: 'tokens',
      title: formatMessage({
        id: 'tokens',
        defaultMessage: 'Tokens',
      }),
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      ),
    },
    {
      id: 'reviews',
      title: formatMessage({
        id: 'reviews',
        defaultMessage: 'Reviews',
      }),
      Icon: <PaperAirplaneIcon className="h-4 w-5" />,
    },
    {
      id: 'logs',
      title: formatMessage({
        id: 'user-activities',
        defaultMessage: 'Activity',
      }),
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>
      ),
    },
    extendedData !== null && {
      id: 'extended',
      title: formatMessage({
        id: 'extended-fields',
        defaultMessage: 'Extended',
      }),
      Icon: <PuzzlePieceIcon className="h-4 w-5" />,
    },
  ];
  return (
    <Tab tabItems={userProfileSettingOptions} defaultTab="profile">
      <GetCurrentTab user={user} {...extendedData} />
    </Tab>
  );
};

export default UserSettings;

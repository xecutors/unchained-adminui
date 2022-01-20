import { useIntl } from 'react-intl';
import ResetPassword from '../../modules/accounts/components/ResetPassword';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

const PasswordReset = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'account',
          defaultMessage: 'Account',
        })}
      />
      <ResetPassword />
    </>
  );
};

export default PasswordReset;

import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useCreateUser from '../../modules/accounts/hooks/useCreateUser';
import CreateUserForm from '../../modules/accounts/components/CreateUserForm';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';

const CreateUser = () => {
  const { formatMessage } = useIntl();
  const { createUser } = useCreateUser();
  const router = useRouter();
  const onCreateUser = async (userData) => {
    const {
      phoneMobile,
      birthday,
      gender,
      username,
      password,
      email,
      displayName,
    } = userData;
    const {
      firstName,
      lastName,
      company,
      addressLine,
      addressLine2,
      postalCode,
      regionCode,
      countryCode,
      city,
    } = userData;

    await createUser({
      username,
      email,
      password,
      profile: {
        displayName,
        phoneMobile,
        birthday,
        gender,
        address: {
          firstName,
          lastName,
          company,
          addressLine,
          addressLine2,
          postalCode,
          regionCode,
          countryCode,
          city,
        },
      },
      disableHashing: true,
    });

    return true;
  };

  const onSubmitSuccess = () => {
    router.push('/users');
  };
  return (
    <>
      <BreadCrumbs />
      <PageHeader
        headerText={formatMessage({
          id: 'new_user_header',
          defaultMessage: 'New user',
        })}
      />
      <div className="mt-6">
        <CreateUserForm
          onSubmit={onCreateUser}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
    </>
  );
};

export default CreateUser;

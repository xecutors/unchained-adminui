import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import useCreateUser from '../../modules/accounts/hooks/useCreateUser';
import CreateUserForm from '../../modules/accounts/components/CreateUserForm';
import BreadCrumbs from '../../modules/common/components/BreadCrumbs';
import PageHeader from '../../modules/common/components/PageHeader';
import useCurrentRoles from '../../modules/accounts/hooks/useCurrentRoles';
import ACTION_ROLES from '../../modules/common/data/roles';

const CreateUser = () => {
  const { formatMessage } = useIntl();
  const { createUser } = useCreateUser();
  const { hasRole } = useCurrentRoles();
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

    const { data, errors } = await createUser({
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
    if (errors?.length) return false;
    return { success: true, data: data?.createUser };
  };

  const onSubmitSuccess = (_, { id }) => {
    if (hasRole(ACTION_ROLES.users.view));
    router.push(`/users/${id}`);
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

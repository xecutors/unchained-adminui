import { useRouter } from 'next/router';
import useCreateUser from '../../modules/accounts/hooks/useCreateUser';
import CreateUserForm from '../../modules/accounts/components/CreateUserForm';

const CreateUser = () => {
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
    <CreateUserForm onSubmit={onCreateUser} onSubmitSuccess={onSubmitSuccess} />
  );
};

export default CreateUser;

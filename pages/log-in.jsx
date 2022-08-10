import LogIn from '../modules/accounts/components/Login';

const LogInPage = ({ endpoint, handleOnBlur, connection }) => {
  return (
    <LogIn
      endpoint={endpoint}
      handleOnBlur={handleOnBlur}
      connection={connection}
    />
  );
};

export default LogInPage;

LogInPage.getLayout = (page) => page;

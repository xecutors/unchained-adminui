import LogIn from '../modules/accounts/components/Login';

const LogInPage = ({ onEndpointChange }) => {
  return <LogIn onEndpointChange={onEndpointChange} />;
};

export default LogInPage;

LogInPage.getLayout = (page) => page;

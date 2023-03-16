import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useLogInWithOAuth from '../modules/accounts/hooks/useLoginWithOAuth';

const Oauth = () => {
  const { logInWithOAuth } = useLogInWithOAuth();
  const router = useRouter();

  useEffect(() => {
    const asyncLogin = async () => {
      if (router.query.code && router.query.state) {
        try {
          await logInWithOAuth({
            provider: router.query.state,
            authorizationCode: router.query.code,
            redirectUrl: 'http://localhost:3000/oauth',
          });
          router.push('/');
        } catch (e) {
          if (e.message === 'Email already exists')
            toast.error('Account with the same email address already exists');
          router.push('/log-in');
        }
      }
    };
    asyncLogin();
  }, []);

  return null;
};

export default Oauth;

Oauth.getLayout = (page) => page;

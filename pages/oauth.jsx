import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useLogInWithOAuth from '../modules/accounts/hooks/useLoginWithOAuth';

const Oauth = () => {
  const { logInWithOAuth } = useLogInWithOAuth();
  const router = useRouter();

  useEffect(() => {
    const asyncLogin = async () => {
      if (router.query.code && router.query.state) {
        await logInWithOAuth({
          provider: router.query.state,
          authorizationCode: router.query.code,
          redirectUrl: 'http://localhost:3000/oauth',
        });
        router.push('/');
      }
    };
    asyncLogin();
  }, []);

  return null;
};

export default Oauth;

Oauth.getLayout = (page) => page;

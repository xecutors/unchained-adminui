import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useLinkOauthProvider from '../../modules/accounts/hooks/useLinkOauthProvider';

const Oauth = () => {
  const { linkOauthProvider } = useLinkOauthProvider();
  const router = useRouter();

  useEffect(() => {
    const asyncLogin = async () => {
      if (router.query.code && router.query.state) {
        await linkOauthProvider({
          provider: router.query.state,
          authorizationCode: router.query.code,
          redirectUrl: 'http://localhost:3000/account/oauth',
        });
        router.push('/account');
      }
    };
    asyncLogin();
  }, []);

  return null;
};

export default Oauth;

Oauth.getLayout = (page) => page;

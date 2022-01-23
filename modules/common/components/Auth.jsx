import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CurrentUserQuery } from '../../accounts/hooks/useCurrentUser';

const Auth = ({ apollo, children }) => {
  const UnrestrictedPages = [
    '/log-in',
    '/sign-up',
    '/forgot-password',
    '/account/reset-password',
  ];
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const { data } = await apollo.query({
        query: CurrentUserQuery,
        errorPolicy: 'none',
        fetchPolicy: 'network-only',
      });
      if (!data?.me && !UnrestrictedPages.includes(router.pathname))
        router.push('/log-in');
    })();
  }, [router.pathname]);

  return <>{children}</>;
};

export default Auth;

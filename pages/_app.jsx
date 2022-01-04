import { ApolloProvider } from '@apollo/client'
import { useRouter } from 'next/router';
import { useApollo } from '../modules/apollo/apolloClient';

import '../styles/globals.css'

const UnchainedAdmin  = ({ Component, pageProps, ...rest }) => {
  const router = useRouter();
  const routerLocale = rest.router.locale || router.locale;

  const apollo = useApollo(pageProps, { locale: routerLocale });
  return <ApolloProvider client={apollo}>
   <Component {...pageProps} />
   </ApolloProvider>
}

export default UnchainedAdmin

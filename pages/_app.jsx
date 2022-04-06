import { ApolloProvider } from '@apollo/client';
import 'react-quill/dist/quill.snow.css';
import App from 'next/app';

import { useRouter } from 'next/router';

import { ToastContainer } from 'react-toastify';
import { useApollo } from '../modules/apollo/apolloClient';
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.min.css';
import getMessages from '../modules/i18n/utils/getMessages';
import IntlWrapper from '../modules/i18n/components/IntlWrapper';
import Layout from '../modules/common/components/Layout';

import ModalWrapper from '../modules/modal/components/ModalWrapper';
import AuthWrapper from '../modules/Auth/AuthWrapper';

const UnchainedAdmin = ({ Component, pageProps, ...rest }) => {
  const router = useRouter();

  const { locale } = router;

  const apollo = useApollo(pageProps, { locale });

  const getLayout =
    Component.getLayout ||
    ((page) => (
      <Layout apollo={apollo} {...rest}>
        {page}
      </Layout>
    ));

  const messages = getMessages(router.locale);

  return (
    <ApolloProvider client={apollo}>
      <IntlWrapper
        locale={router.locale}
        messages={messages}
        key="intl-provider"
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ModalWrapper>
          <AuthWrapper>{getLayout(<Component {...pageProps} />)}</AuthWrapper>
        </ModalWrapper>
      </IntlWrapper>
    </ApolloProvider>
  );
};
UnchainedAdmin.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};
export default UnchainedAdmin;

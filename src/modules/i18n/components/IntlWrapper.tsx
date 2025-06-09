import '@formatjs/intl-pluralrules/polyfill';

import '@formatjs/intl-relativetimeformat/polyfill';
import { IntlProvider } from 'react-intl';

const IntlWrapper = ({ children, locale, messages }) => {
  return (
    <IntlProvider
      onError={() => {}}
      locale={locale}
      messages={messages}
      textComponent="span"
    >
      {children}
    </IntlProvider>
  );
};

export default IntlWrapper;

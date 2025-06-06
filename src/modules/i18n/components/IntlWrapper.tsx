import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { de } from 'date-fns/locale/de';

import '@formatjs/intl-pluralrules/polyfill';

import '@formatjs/intl-relativetimeformat/polyfill';
import { IntlProvider } from 'react-intl';

registerLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE, de);
setDefaultLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE);

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

import { IntlProvider } from 'react-intl';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import dateDe from 'date-fns/locale/de';

import '@formatjs/intl-pluralrules/polyfill';

import '@formatjs/intl-relativetimeformat/polyfill';

registerLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE, dateDe);
setDefaultLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE);

const IntlWrapper = ({ children, locale, messages }) => {
  return (
    <IntlProvider locale={locale} messages={messages} textComponent="span">
      {children}
    </IntlProvider>
  );
};

export default IntlWrapper;

import '@formatjs/intl-pluralrules/polyfill';

import '@formatjs/intl-relativetimeformat/polyfill';
import { IntlProvider } from 'react-intl';
import { useState, useEffect } from 'react';
import getMessages from '../utils/getMessages';

const IntlWrapper = ({
  children,
  locale: initialLocale,
  messages: initialMessages,
}) => {
  const [locale, setLocale] = useState(initialLocale);
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    // After hydration, check for stored language preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('preferred-language');
      if (stored && stored !== locale) {
        setLocale(stored);
        setMessages(getMessages(stored));
      }
    }
  }, [locale]);

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

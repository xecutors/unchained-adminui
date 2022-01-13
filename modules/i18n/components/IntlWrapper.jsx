import React from 'react';
import { IntlProvider } from 'react-intl';
import SimpleSchema from 'simpl-schema';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import dateDe from 'date-fns/locale/de';

import '@formatjs/intl-pluralrules/polyfill';

import '@formatjs/intl-relativetimeformat/polyfill';

registerLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE, dateDe);
setDefaultLocale(process.env.NEXT_PUBLIC_DEFAULT_LOCALE);

const regExpMessages = {
  en: [
    {
      exp: SimpleSchema.RegEx.Email.toString(),
      msg: 'must be a valid email address',
    },
    {
      exp: SimpleSchema.RegEx.EmailWithTLD.toString(),
      msg: 'must be a valid email address',
    },
    {
      exp: SimpleSchema.RegEx.Domain.toString(),
      msg: 'must be a valid domain',
    },
    {
      exp: SimpleSchema.RegEx.WeakDomain.toString(),
      msg: 'must be a valid domain',
    },
    {
      exp: SimpleSchema.RegEx.IP.toString(),
      msg: 'must be a valid IPv4 or IPv6 address',
    },
    {
      exp: SimpleSchema.RegEx.IPv4.toString(),
      msg: 'must be a valid IPv4 address',
    },
    {
      exp: SimpleSchema.RegEx.IPv6.toString(),
      msg: 'must be a valid IPv6 address',
    },
    {
      exp: SimpleSchema.RegEx.Url.toString(),
      msg: 'must be a valid URL',
    },
    {
      exp: SimpleSchema.RegEx.Id.toString(),
      msg: 'must be a valid alphanumeric ID',
    },
    {
      exp: SimpleSchema.RegEx.ZipCode.toString(),
      msg: 'must be a valid zip code',
    },
    {
      exp: SimpleSchema.RegEx.Phone.toString(),
      msg: 'must be a valid phone number',
    },
  ],
};

const defaultMessages = [];
const regExTranslator =
  (lang, defaultMsg) =>
  ({ label, regExp }) => {
    let msgObj = null;
    if (regExp) {
      const regExTranslationTable =
        (regExpMessages && regExpMessages[lang]) || defaultMessages;
      msgObj = regExTranslationTable.reduce((oldValue, current) => {
        if (current.exp === regExp) {
          return current;
        }
        return oldValue;
      }, null);
    }
    const regExpMessage = msgObj ? msgObj.msg : defaultMsg;
    return `${label} ${regExpMessage}`;
  };

SimpleSchema.setDefaultMessages({
  messages: {
    en: {
      required: '{{{label}}} is a required field',
      minString: '{{{label}}} must be at least {{min}} characters long',
      maxString: '{{{label}}} must not be longer than {{max}} characters',
      minNumber: '{{{label}}} must be equal to or greater than {{min}}',
      maxNumber: '{{{label}}} must be less than or equal to {{max}}',
      minNumberExclusive: '{{{label}}} must be greater than {{min}}',
      maxNumberExclusive: '{{{label}}} must be less than {{max}}',
      minDate: '{{{label}}} must be on or before {{min}}',
      maxDate: '{{{label}}} must not be after {{max}}',
      badDate: '{{{label}}} is not a valid date',
      minCount: '{{{label}}}: Enter at least {{minCount}} values',
      maxCount: '{{{label}}}: Enter a maximum of {{maxCount}} values',
      noDecimal: '{{{label}}} must be an integer',
      notAllowed: '{{{value}}} is not allowed as a value',
      expectedType: '{{{label}}} must be of type {{dataType}}',
      regEx: regExTranslator(
        'en',
        'The input was invalidated during validation by a regular expression',
      ),
      keyNotInSchema: '{{name}} as a key is not allowed',
    },
  },
});

const IntlWrapper = ({ children, locale, messages }) => {
  return (
    <IntlProvider locale={locale} messages={messages} textComponent="span">
      {children}
    </IntlProvider>
  );
};

export default IntlWrapper;

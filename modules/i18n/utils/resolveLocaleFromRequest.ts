import accepts from 'accepts';
import supportedLanguages from './supportedLanguages';

const mixWithCountries = (languages, countries) =>
  languages.flatMap((language) => [
    ...countries.map((country) => `${language}-${country}`),
    language,
  ]);

const resolveLocaleFromRequest = async (req) => {
  const accept = accepts(req);
  const supported = supportedLanguages();
  const supportedLocales = mixWithCountries(supported, ['CH']);
  const locale = accept.language(supportedLocales) || supportedLocales[0];
  return locale;
};

export default resolveLocaleFromRequest;

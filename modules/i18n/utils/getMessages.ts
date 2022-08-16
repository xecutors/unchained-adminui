import getConfig from 'next/config';
import defaultTranslations from '../../../i18n';

const {
  publicRuntimeConfig: { extendedLanguages },
} = getConfig();

const getMessages = (locale) => {
  const language = locale.split('-').shift();
  return { ...defaultTranslations, ...extendedLanguages }[language];
};

export default getMessages;

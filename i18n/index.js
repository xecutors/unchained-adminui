import getConfig from 'next/config';
import en from './en.json';

const {
  publicRuntimeConfig: { supportedLanguages },
} = getConfig();

const localizations = {
  en,
  ...supportedLanguages,
};

export default localizations;

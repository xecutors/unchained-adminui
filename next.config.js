/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable camelcase */
require('./node_env');
const fs = require('fs');

const withPWA = require('next-pwa');

const runtimeCaching = require('next-pwa/cache');

const enLang = require('./i18n/en.json');

const normalizePath = (paths) => {
  if (paths) {
    return paths?.split(',')?.map((file) => {
      const path = file?.substr(0, file?.lastIndexOf('/') + 1);
      const lang = file?.substr(file?.lastIndexOf('/') + 1)?.split('.')[0];
      const ext = file?.substr(file?.lastIndexOf('/') + 1)?.split('.')[1];
      return { path, lang, ext };
    });
  }
  return [];
};

const { UNCHAINED_ADMINUI_TRANSLATIONS: translatedFiles } = process.env;
const supportedLanguages = normalizePath(translatedFiles);

const translatedLanguages =
  (supportedLanguages?.length &&
    supportedLanguages?.map(({ path, lang, ext }) => {
      const translatedFile = require(`./${path}${lang}.${ext}`);

      if (translatedFile) {
        if (
          Object.keys(translatedFile).every((key) =>
            Object.keys(enLang).includes(key),
          )
        ) {
          return { lang, data: translatedFile };
        }
        throw Error('key is not available');
      } else {
        throw Error(`${lang} json file is not provided`);
      }
    })) ||
  [];

const { UNCHAINED_META_CONFIG_FILE } = process.env;
let metaConfig = null;
if (
  fs.existsSync(UNCHAINED_META_CONFIG_FILE) &&
  process.env.NODE_ENV === 'production'
) {
  metaConfig = require(UNCHAINED_META_CONFIG_FILE);
}

module.exports = withPWA({
  pwa: {
    dest: 'public',
    skipWaiting: false,
    runtimeCaching,
    disable: process.env.NODE_ENV === 'development',
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  i18n: {
    locales: supportedLanguages?.length
      ? ['en', ...supportedLanguages.map((lang) => lang?.lang)]
      : ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  publicRuntimeConfig: {
    metaConfig,
    showCustomReports: parseInt(
      process.env.NEXT_PUBLIC_SHOW_CUSTOM_REPORTS,
      10,
    ),
    manifestFile: process.env.UNCHAINED_PWA_MANIFEST_FILE,
    logo: process.env.NEXT_PUBLIC_LOGO,
    allowEndpointSwitch: process.env.NEXT_PUBLIC_ALLOW_ENDPOINT_SWITCH,
    supportedLanguages: translatedLanguages?.reduce(
      (prev, next) => ({ ...prev, [next?.lang]: next.data }),
      {},
    ),
  },
});

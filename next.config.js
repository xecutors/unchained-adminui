/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable camelcase */

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

require('./node_env');
const fs = require('fs');
const path = require('path');

const normalizePaths = (paths) => {
  if (paths) {
    return paths?.split(',')?.map((file) => {
      if (path.extname(file) !== '.json') {
        throw new Error(`${file}: extension should be json`);
      }
      return path.resolve(file);
    });
  }
  return [];
};

const { UNCHAINED_ADMINUI_TRANSLATIONS: translatedFiles } = process.env;
const extendedLanguages = normalizePaths(translatedFiles);
const translatedLanguages = extendedLanguages?.map((file) => {
  const lang = path.basename(file, '.json');
  const translatedFile = JSON.parse(fs.readFileSync(file, 'utf8'));

  const enLang = JSON.parse(fs.readFileSync('./i18n/en.json', 'utf-8'));

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
});
const isExporting = process.env.NEXT_PHASE === 'export';
const languages = extendedLanguages?.map((file) =>
  path.basename(file, '.json'),
);

module.exports = {
  output: 'export',
  basePath: isExporting ? '/out' : '',
  trailingSlash: true,
  assetPrefix: isExporting ? '/out/' : '',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  /* i18n: {
    locales: extendedLanguages?.length ? ['en', ...languages] : ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  }, */
  images: {
    unoptimized: true,
  },
  /* publicRuntimeConfig: {
    oAuthClientId: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
    publicGraphQLEndpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    logo: process.env.NEXT_PUBLIC_LOGO,
    restrictNonAdmin: !!process.env.NEXT_PUBLIC_ONLY_ADMIN,
    allowEndpointSwitch: process.env.NEXT_PUBLIC_ALLOW_ENDPOINT_SWITCH,
    extendedLanguages: translatedLanguages?.reduce(
      (prev, next) => ({ ...prev, [next?.lang]: next.data }),
      {},
    ),
  }, */
};

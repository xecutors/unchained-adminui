/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable camelcase */
require('./node_env');
const fs = require('fs');

const withPWA = require('next-pwa');

const runtimeCaching = require('next-pwa/cache');

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
    locales: ['en'],
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
    allowEndpoint: process.env.NEXT_PUBLIC_ALLOW_ENDPOINT_SELECTION,
  },
});

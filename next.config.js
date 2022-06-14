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
  const generateManifestFiles = () => {
    const {
      name,
      scope,
      description,
      display,
      short_name,
      start_url,
      background_color,
      theme_color,
      assets,
    } = metaConfig;

    const manifest = {
      name,
      scope,
      description,
      display,
      short_name,
      start_url,
      background_color,
      theme_color,
      icons: [
        assets?.['icon-32x32'] && {
          src: assets?.['icon-32x32'],
          sizes: '32x32',
          type: 'image/png',
          density: '0.75',
        },
        assets?.['icon-48x48'] && {
          src: assets?.['icon-48x48'],
          sizes: '48x48',
          type: 'image/png',
          density: '1.0',
        },
        assets?.['icon-72x72'] && {
          src: assets?.['icon-72x72'],
          sizes: '72x72',
          type: 'image/png',
          density: '1.5',
        },
        assets?.['icon-96x96'] && {
          src: assets?.['icon-96x96'],
          sizes: '96x96',
          type: 'image/png',
          density: '2.0',
        },
        assets?.['icon-144x144'] && {
          src: assets?.['icon-144x144'],
          sizes: '144x144',
          type: 'image/png',
          density: '3.0',
        },
        assets?.['icon-192*192'] && {
          src: assets?.['icon-192*192'],
          sizes: '192x192',
          type: 'image/png',
          density: '4.0',
        },
      ],
    };
    fs.writeFileSync(`manifest.json`, JSON.stringify(manifest, null, 2));
  };

  generateManifestFiles();
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
  productionBrowserSourceMaps: process.env.NODE_ENV === 'production',
  publicRuntimeConfig: {
    metaConfig,
    showCustomReports: parseInt(
      process.env.NEXT_PUBLIC_SHOW_CUSTOM_REPORTS,
      10,
    ),
    logo: process.env.NEXT_PUBLIC_LOGO,
  },
});

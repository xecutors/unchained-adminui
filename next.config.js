require('./node_env');
const {
  UNCHAINED_LANG,
  GRAPHQL_ENDPOINT,
  DEBUG = false,
} = process.env;

module.exports = {
  typescript: {
    ignoreBuildErrors: false,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: [
      'localhost',
    ],
    deviceSizes: [320, 480, 820, 1200, 1600],
    imageSizes: [32, 48, 96, 256],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    UNCHAINED_LANG,
    GRAPHQL_ENDPOINT,
    DEBUG,
  },
};

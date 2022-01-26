require('./node_env');

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
    domains: ['localhost'],
    deviceSizes: [320, 480, 820, 1200, 1600],
    imageSizes: [32, 48, 96, 256],
  },
};

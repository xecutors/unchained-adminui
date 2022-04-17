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
    domains: ['localhost', 'engine.dev.publicare.ch', 'robohash.org'],
    deviceSizes: [320, 480, 820, 1200, 1600],
    imageSizes: [32, 48, 96, 256],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    showCustomReports: parseInt(
      process.env.NEXT_PUBLIC_SHOW_CUSTOM_REPORTS,
      10,
    ),
    logo: process.env.NEXT_PUBLIC_LOGO,
  },
};

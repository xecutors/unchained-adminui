require('./node_env');

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
    // Will be available on both server and client
    showCustomReports: parseInt(
      process.env.NEXT_PUBLIC_SHOW_CUSTOM_REPORTS,
      10,
    ),
    logo: process.env.NEXT_PUBLIC_LOGO,
  },
});

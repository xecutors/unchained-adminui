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

  images: {
    domains: [
      'dev.publicare.ch',
      'demo.publicare.ch',
      'publicare.ch',
      'engine.dev.publicare.ch',
      'engine.demo.publicare.ch',
      'engine.publicare.ch',
      'thumbor.dev.publicare.ch',
      'thumbor.demo.publicare.ch',
      'thumbor.publicare.ch',
      'cms.dev.publicare.ch',
      'cms.publicare.ch',
      'localhost',
    ],
    deviceSizes: [320, 480, 820, 1200, 1600],
    imageSizes: [32, 48, 96, 256],
  },
};

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable camelcase */

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

require('./node_env');

module.exports = {
  output: 'export',
  basePath: '',
  trailingSlash: true,
  assetPrefix: '/public',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    unoptimized: true,
  },
};

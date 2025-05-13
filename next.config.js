/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable camelcase */

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

require('./node_env');

const isExporting = process.env.NEXT_PUBLIC_PHASE === 'export';
module.exports = {
  output: 'export',
  basePath: isExporting ? '/out' : '',
  trailingSlash: true,
  assetPrefix: isExporting ? '/out/' : '',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    unoptimized: true,
  },
};

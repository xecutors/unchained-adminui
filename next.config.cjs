/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable camelcase */

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

// eslint-disable-next-line @typescript-eslint/no-require-imports
import './node_env.js'; // for side effects only, note the .js extension is required in ESM

module.exports = {
  output: 'export',
  basePath: '',
  trailingSlash: true,
  assetPrefix: '',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  images: {
    unoptimized: true,
  },
};

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

require('./node_env.js'); // for side effects only, note the .js extension is required in ESM

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

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// metaConfig.js
const path = require('path');

function loadPWAMetaConfig() {
  let metaConfig;
  const defaultPageMetaConfig = path.resolve('./default-page-meta.json');
  const customPageMetaPath = process.env.UNCHAINED_META_CONFIG_FILE;

  try {
    metaConfig = require(`${customPageMetaPath}`);
    console.error(
      `Loaded custom meta config successfully: ${customPageMetaPath}`,
    );
  } catch (error) {
    console.error(`Failed to load custom meta config: ${error.message}`);
    console.warn(
      `Falling back to default meta config at ${defaultPageMetaConfig}`,
    );
    metaConfig = require(defaultPageMetaConfig);
  }

  return metaConfig;
}

module.exports = loadPWAMetaConfig;

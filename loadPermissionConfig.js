/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
// permissionConfig.js
const path = require('path');

function loadPermissionConfig() {
  let permissionConfig;
  const defaultConfigPath = path.resolve(
    __dirname,
    'default-permissions.config.js',
  );
  const userConfigPath = process.env.UI_PERMISSION_CONFIG;

  try {
    // Attempt to load user-specified config file
    permissionConfig = require(`${userConfigPath}`);
    console.info(
      `Loaded user-specified permission config successfully: ${userConfigPath}`,
    );
  } catch (error) {
    // If user-specified config file fails to load, fallback to default
    console.error(
      `Failed to load user-specified permission config: ${error.message}`,
    );
    console.warn(
      `Falling back to default permission config at ${defaultConfigPath}`,
    );
    permissionConfig = require(defaultConfigPath);
  }

  return permissionConfig;
}

module.exports = loadPermissionConfig;

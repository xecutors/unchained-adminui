const loadPermissionConfig = require('../loadPermissionConfig');

function getProcessedPermissions() {
  const permissionConfig = loadPermissionConfig();
  return permissionConfig;
}

module.exports = { getProcessedPermissions };

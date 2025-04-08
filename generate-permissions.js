const fs = require('fs');
const path = require('path');
const { getProcessedPermissions } = require('./lib/permissionConfig');

const output = `window.AdminUiPermissions = ${getProcessedPermissions()};`;
fs.writeFileSync(
  path.join(__dirname, './public/admin-ui-permissions.js'),
  output,
  'utf8',
);
console.log('✅ Permissions JS file generated.');

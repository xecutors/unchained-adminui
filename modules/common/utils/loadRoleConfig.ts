const dynamicallyImportFromFilesystem = async (filePath) => {
  const module = await import(filePath);
  return module;
};

const loadRoleConfigFromInjectedGlobalScript = () => {
  const scriptElement = document.getElementById('role-config-script');

  if (scriptElement) {
    const roleConfig = JSON.parse(scriptElement.textContent);
    return roleConfig;
  }
  return null;
};

const loadRoleConfig = async () => {
  if (typeof window === 'undefined') {
    const roleConfigModule = await dynamicallyImportFromFilesystem(
      process.env.UI_PERMISSION_CONFIG,
    );

    return roleConfigModule;
  }
  return loadRoleConfigFromInjectedGlobalScript();
};

export default loadRoleConfig;

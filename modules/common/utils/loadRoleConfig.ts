const UnrestrictedPages = [
  '/log-in',
  '/sign-up',
  '/oauth',
  '/account/forgot-password',
  '/reset-password',
  '/api/graphql',
  '/404',
  '/423',
  '/_offline',
  '/verify-email',
];

const loadRoleConfigFromInjectedGlobalScript = () => {
  if (typeof window === 'undefined' || !window?.AdminUiPermissions) return {};
  return window.AdminUiPermissions({ UnrestrictedPages });
};

const loadRoleConfig = () => {
  return loadRoleConfigFromInjectedGlobalScript();
};

export default loadRoleConfig;

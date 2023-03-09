/* eslint-disable no-unused-vars */
const {
  ROUTE_ROLES,
  UnrestrictedPages,
} = require('./modules/common/data/roles');

function isAdmin(user) {
  return (
    user?.allowedActions.length === 0 || (user?.roles || []).includes('admin')
  );
}
module.exports = {
  permissions: {
    checkAccess: (
      user,
      action,

      apolloClient,
      { componentName, router },
    ) => {
      const { pathname } = router;
      if (!user?._id && !UnrestrictedPages.includes(pathname)) return false;

      if (
        ROUTE_ROLES[pathname] === 'UNRESTRICTED' ||
        isAdmin() ||
        (user?.allowedActions || [])?.includes(ROUTE_ROLES[pathname])
      )
        return true;
      return false;
    },
    checkRole: (user, role, apolloClient, { componentName, router }) => {
      if (isAdmin()) {
        return true;
      }
      if (user?.allowedActions.includes(role)) {
        return true;
      }
      return false;
    },
    isUserAdmin: isAdmin,
    isUserAuthenticated: (user) => {
      return !!user?._id;
    },
  },
  UnrestrictedPages,
};

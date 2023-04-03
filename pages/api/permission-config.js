import getConfig from 'next/config';

const generateRoleConfig = async (permissionConfig) => {
  try {
    const module = await import(permissionConfig);
    const roleConfigFunction = module.default;
    const roleConfig = roleConfigFunction({});
    return roleConfig;
  } catch (error) {
    return permissionConfig;
  }
};

export default async function handler(req, res) {
  const {
    publicRuntimeConfig: { permissionConfig },
  } = getConfig();

  const js = await generateRoleConfig(permissionConfig);

  res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.status(200).send(js);
}

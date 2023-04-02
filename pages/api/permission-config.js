import getConfig from 'next/config';

const generateRoleConfig = async (roleConfig) => {
  let injectScripts;

  try {
    const result = await fetch(roleConfig);
    injectScripts = result?.text();
  } catch (e) {
    injectScripts = roleConfig;
  }

  return injectScripts;
};

export default async function handler(req, res) {
  const {
    publicRuntimeConfig: { permissionConfig },
  } = getConfig();
  const js = await generateRoleConfig(permissionConfig);
  res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

  res.status(200).json(js);
}

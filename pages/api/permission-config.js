import getConfig from 'next/config';

export default async function handler(req, res) {
  const {
    publicRuntimeConfig: { permissionConfig },
  } = getConfig();
  const { query } = req;

  if (query?.json) {
    const result = permissionConfig();
    Object.keys(result).forEach((key) => {
      if (typeof result[key] === 'function') {
        result[key] = result[key].toString();
      }
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result.toString());
  } else {
    const javascriptCode = `window.AdminUiPermissions = ${permissionConfig.toString()}`;
    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.status(200).send(javascriptCode);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

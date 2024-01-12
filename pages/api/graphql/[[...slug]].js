import { createProxyMiddleware } from 'http-proxy-middleware';
import http from 'http';
import https from 'https';

const engineURL = new URL(process.env.GRAPHQL_ENDPOINT);

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
    responseLimit: false,
  },
};

const agent =
  engineURL.protocol === 'https:'
    ? new https.Agent({ keepAlive: true })
    : new http.Agent({ keepAlive: true });

export default createProxyMiddleware({
  agent,
  cookieDomainRewrite: {
    '*': '',
  },
  cookiePathRewrite: '/',
  target: engineURL.href,
  changeOrigin: true,
  proxyTimeout: 30000,
  onProxyRes: (proxyRes) => {
    const removeSecure = (str) => str.replace(/; Secure/i, '');
    const set = proxyRes.headers['set-cookie'];
    if (set) {
      const result = Array.isArray(set)
        ? set.map(removeSecure)
        : removeSecure(set);
      // eslint-disable-next-line
      proxyRes.headers['set-cookie'] = result;
    }
  },
});

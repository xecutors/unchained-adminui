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
    '*': process.env.UNCHAINED_COOKIE_DOMAIN || '',
  },
  cookiePathRewrite: '/',
  target: engineURL.origin,
  changeOrigin: true,
  proxyTimeout: 60000,
  pathRewrite: { '^/api/graphql': '/graphql' },
  on: {
    proxyReq: (proxyReq) => {
      if (process.env.PERSISTED_QUERIES_KEY) {
        proxyReq.setHeader('X-Unlock-API', process.env.PERSISTED_QUERIES_KEY);
      }
    },
    proxyRes: (proxyRes) => {
      const set = proxyRes.headers['set-cookie'];
      if (set) {
        proxyRes.headers['set-cookie'] = set;
      }
    },
  },
});

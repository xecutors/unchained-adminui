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
  engineURL.protocol === 'https:' ? new https.Agent({}) : new http.Agent({});

export default createProxyMiddleware({
  agent,
  cookieDomainRewrite: {
    '*': process.env.UNCHAINED_COOKIE_DOMAIN || '',
  },
  cookiePathRewrite: '/',
  // onError: (err, req, res) => {
  //   console.error('Proxy error:', err);

  // pathRewrite: (path, req) => {
  //   // Remove the /api/graphql prefix from the path
  //   const newPath = path.replace(/^\/api\/graphql/, '');
  //   console.log(newPath);
  //   return newPath;
  // },
  target: process.env.GRAPHQL_ENDPOINT,
  changeOrigin: true,
  proxyTimeout: 60000,
});

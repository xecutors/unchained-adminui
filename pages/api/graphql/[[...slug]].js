import httpProxy from 'http-proxy';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default (req, res) =>
  new Promise((resolve, reject) => {
    const proxy = httpProxy.createProxy();
    proxy
      .once('proxyRes', resolve)
      .once('error', reject)
      .web(req, res, {
        cookieDomainRewrite: {
          '*': '',
        },
        cookiePathRewrite: '/',
        target: process.env.GRAPHQL_ENDPOINT,
        changeOrigin: true,
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
  });

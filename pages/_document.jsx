import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';
import getLogo from '../modules/common/utils/getLogo';

const {
  publicRuntimeConfig: { metaConfig },
} = getConfig();

class MyDocument extends Document {
  render() {
    const logo = getLogo();
    return (
      <Html className="h-full">
        <Head>
          {Object.entries(metaConfig?.meta || {}).map(([key, value]) => (
            <meta name={key} content={value} />
          ))}

          {logo && (
            <link
              rel="apple-touch-icon"
              type="image/png"
              sizes="180x180"
              href={logo}
            />
          )}
          {metaConfig?.assets?.['icon-152x152'] && (
            <link
              rel="apple-touch-icon"
              type="image/png"
              sizes="152x152"
              href={metaConfig?.assets?.['icon-152x152']}
            />
          )}
          {metaConfig?.assets?.['icon-180x180'] && (
            <link
              rel="apple-touch-icon"
              type="image/png"
              sizes="180x180"
              href={metaConfig?.assets?.['icon-180x180']}
            />
          )}
          {metaConfig?.assets?.['icon-167x167'] && (
            <link
              rel="apple-touch-icon"
              type="image/png"
              sizes="167x167"
              href={metaConfig?.assets?.['icon-167x167']}
            />
          )}
          {metaConfig?.assets?.['icon-167x167'] && (
            <link
              rel="icon"
              type="image/png"
              sizes="167x167"
              href={metaConfig?.assets?.['icon-167x167']}
            />
          )}
          {metaConfig?.assets?.['icon-32x32'] && (
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href={metaConfig?.assets?.['icon-32x32']}
            />
          )}
          {metaConfig?.assets?.['icon-16x16'] && (
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href={metaConfig?.assets?.['icon-16x16']}
            />
          )}
          <link rel="manifest" href="/manifest.json" />

          {metaConfig?.assets?.['mask-icon'] && (
            <link
              rel="shortcut icon"
              href={metaConfig?.assets?.['mask-icon']}
            />
          )}
          {metaConfig?.assets?.['shortcut-icon'] && (
            <link
              rel="shortcut icon"
              href={metaConfig?.assets?.['shortcut-icon']}
            />
          )}
        </Head>
        <body className="h-full bg-slate-100 dark:bg-slate-600 dark:text-white">
          <noscript
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{
              __html: `
  <!--
   _____ _____ _____ _____ _____ _____ _____ _____ ____
  |  |  |   | |     |  |  |  _  |     |   | |   __|    \\
  |  |  | | | |   --|     |     |-   -| | | |   __|  |  |
  |_____|_|___|_____|__|__|__|__|_____|_|___|_____|____/

  - Technology, Engineering & Design by Unchained Commerce GmbH - https://unchained.shop

  -->

    `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

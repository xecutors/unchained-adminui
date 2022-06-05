import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full">
        <Head>
          <meta name="application-name" content="Unchained Admin UI" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Admin UI" />
          <meta
            name="description"
            content="Unchained e-commerce shop admin control"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#537bd8" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#537bd8" />

          <link rel="apple-touch-icon" href="/icons/apple-icon.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-icon-180x180.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/apple-icon-167x167.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/logo.svg" color="#537bd8" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://unchained.shop" />
          <meta name="twitter:title" content="Unchained Admin UI" />
          <meta
            name="twitter:description"
            content="Unchained e-commerce shop controller"
          />
          <meta
            name="twitter:image"
            content="/icons/android-icon-192x192.png"
          />
          <meta name="twitter:creator" content="@unchainedshop" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Unchained Admin UI" />
          <meta
            property="og:description"
            content="Unchained e-commerce shop controller"
          />
          <meta property="og:site_name" content="Admin UI" />
          <meta property="og:url" content="https://unchained.shop" />
          <meta property="og:image" content="/icons/apple-icon.png" />
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

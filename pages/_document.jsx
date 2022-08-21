import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { metaConfig, manifestFile },
} = getConfig();

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full">
        <Head>
          {Object.entries(metaConfig?.meta || {}).map(([key, value]) => (
            <meta name={key} content={value} />
          ))}
          {manifestFile && <link rel="manifest" href={manifestFile} />}

          {(metaConfig?.metaLinks || []).map((attr) => (
            <link {...attr} />
          ))}
        </Head>
        <body className="h-full bg-slate-100 dark:bg-slate-900 dark:text-slate-200">
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

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-gray-100">
        <Head />
        <body className="h-full">
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

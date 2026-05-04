import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
          <link rel="apple-touch-icon" href="/img/icons/icon-128x128.png" />

          {/* Self-hosted webfonts. Preloads avoid first-paint FOIT for the
              hero serif and the body sans. */}
          <link
            rel="preload"
            href="/fonts/Newsreader-Italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Geist-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/fonts/fonts.css" />

          <meta name="robots" content="noindex" />
          <meta name="theme-color" content="#0A0820" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

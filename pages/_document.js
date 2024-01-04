import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || "en" };
  }

  render() {
    return (
      <Html lang={this.props.locale}>
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.png" />
          <script
            async
            src="https://js.stripe.com/v3/pricing-table.js"
          ></script>

          <script src="https://player.vimeo.com/api/player.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

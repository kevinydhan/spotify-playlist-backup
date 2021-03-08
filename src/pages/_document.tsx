import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'

type GetInitialProps = (
  context: DocumentContext
) => Promise<DocumentInitialProps>
type Render = () => JSX.Element

class MyDocument extends Document {
  static getInitialProps: GetInitialProps = async (context) => {
    const initialProps = await Document.getInitialProps(context)
    return initialProps
  }

  render: Render = () => (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default MyDocument

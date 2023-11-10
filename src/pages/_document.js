import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import Header from '@/components/Header'

export default function Document() {
  return (
    <Html lang="en" className='bg-zinc-900 text-zinc-100'>
      <Head>
        <Script src="https://kit.fontawesome.com/2ad3ea3c29.js" crossOrigin="anonymous" />
      </Head>
      <body className='flex flex-row min-h-screen'>
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

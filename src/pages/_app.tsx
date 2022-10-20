import '../styles/globals.css'
import { AppProps } from 'next/app'
import React from 'react'
import DefaultLayout from '@/components/layouts/Default'

type PageComponent = {
  Component: {
    _getLayout?: () => React.FC
  }
}

const MyApp: React.FC<AppProps & PageComponent> = ({ Component, pageProps }) => {
  const Layout: React.FC<{ children: React.ReactNode }> = (Component._getLayout && Component._getLayout()) || DefaultLayout

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

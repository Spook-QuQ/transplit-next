import '../styles/globals.css'
import { AppProps } from 'next/app'
import React from 'react'
import DefaultLayout from '@/components/layouts/Default'

type LayoutPropsType = {
  children: React.ReactNode
}

type PageComponentType = {
  _getLayout?: () => React.FC
}

type PageComponent = {
  Component: React.FC & PageComponentType;
}

const MyApp: React.FC<AppProps & PageComponent> = ({ Component, pageProps }) => {
  const Layout: React.FC<LayoutPropsType> = (Component._getLayout && Component._getLayout()) || DefaultLayout

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

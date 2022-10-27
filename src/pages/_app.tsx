import '../styles/globals.css'
import { AppProps } from 'next/app'
import React from 'react'
import DefaultLayout from '@/components/layouts/Default/index'
import { Provider } from 'react-redux'
import store from '@/store'

type PageComponentCustomProps = {
  Component: {
    _getLayout?: () => React.FC
  }
}

const MyApp: React.FC<AppProps & PageComponentCustomProps> = ({
  Component,
  pageProps,
}) => {
  const Layout: React.FC<{ children: React.ReactNode }> =
    (Component._getLayout && Component._getLayout()) || DefaultLayout

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp

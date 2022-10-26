import React from 'react'
import Link from 'next/link'

import Header from './parts/Header'
import Footer from './parts/Footer'

type PropsType = {
  children: React.ReactNode
}

const defaultLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default defaultLayout
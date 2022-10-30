import React from 'react'
import Link from 'next/link'

import Header from './parts/Header'
import Footer from './parts/Footer'

type PropsType = {
  children: React.ReactNode
}

const defaultLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className='p-4 md:p-8'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default defaultLayout
import React, { useEffect } from 'react'

import Header from './parts/Header'
import Footer from './parts/Footer'

type PropsType = {
  children: React.ReactNode
}

const DefaultLayout: React.FC<PropsType> = ({ children }) => {

  return (
    <div className='p-4 md:p-8'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default DefaultLayout

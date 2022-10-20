import React from 'react'
import Link from 'next/link'

import Header from './parts/Header'

type PropsType = {
  children: React.ReactNode
}

const defaultLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  )
}

export default defaultLayout
import React from 'react'
import Link from 'next/link'

import Header from './parts/Header'

type Props = {
  children: React.ReactNode
}

const defaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  )
}

export default defaultLayout
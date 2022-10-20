import React from 'react'

import Link from 'next/link'

type Props = {
  children: React.ReactNode
}

const defaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <h1>DefaultLayout</h1>
      <Link href="/information">
        <a>Information</a>
      </Link>
      <div>{children}</div>
    </>
  )
}

export default defaultLayout
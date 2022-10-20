import { NextComponentType, NextPageContext } from 'next'

import Link from 'next/link'

const Information: (NextComponentType<NextPageContext>) = () => {
  return (
    <div>
      <h3
        className="
          text-4xl
          bg-slate-300
          text-sky-900
          font-semibold
          font-serif
        "
      >Test</h3>
      <Link href='/'>
        <a>Home</a>
      </Link>
    </div>
  )
}

export default Information
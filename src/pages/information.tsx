import { NextComponentType, NextPageContext } from 'next'

import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'

const Information: (NextComponentType<NextPageContext>) = ({  }) => {
  // const router: NextRouter = useRouter()
  // console.log(router)
  
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
      >Information{
        // router.pathname
      }</h3>
      <Link href='/'>
        <a>Home</a>
      </Link>
    </div>
  )
}

export default Information
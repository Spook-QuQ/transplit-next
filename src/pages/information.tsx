import { NextComponentType, NextPageContext } from 'next'
import Head from 'next/head'

// import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'

const Information: NextComponentType<NextPageContext> = ({}) => {
  // const router: NextRouter = useRouter()
  // console.log(router)

  return (
    <div className='flex flex-col items-center'>
      <Head>
        <title>Information - Transplit</title>
        <meta name='description' content='Transplit' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <small className='pt-8'>Made by</small>
      <h3>
        {/* <span
          className='
            text-4xl
            // bg-slate-300
            // text-sky-900
            font-semibold
            font-serif
          '
        >
          Information
        </span> */}
        Tomoaki Ohta
        {
          // router.pathname
        }
      </h3>
    </div>
  )
}

export default Information

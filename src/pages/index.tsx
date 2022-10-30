import Head from 'next/head'
// import Image from 'next/image'
import MainTextArea from '@/components/MainTextarea'
import DisplayArea  from '@/components/DisplayArea'

export default function Home() {

  return (
    <div>
      <Head>
        <title>Home - Transplit</title>
        <meta name='description' content='Transplit' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          <MainTextArea />
          <DisplayArea />
        </div>
      </main>
    </div>
  )
}

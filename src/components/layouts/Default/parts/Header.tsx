import Link from 'next/link'
import NavBar from './NavBar'

type PropsType = {}

const Header: React.FC<PropsType> = () => {
  return (
    <header className='flex justify-between items-center cursor-pointer'>
      <Link href='/'>
        <h1 className='a text-2xl font-black duration-300 hover:text-sky-400'>
          Transplit
        </h1>
      </Link>
      <NavBar />
    </header>
  )
}

export default Header

import Link from 'next/link'
import { useRouter, NextRouter } from 'next/router'

type PropsType = {
  name: string
  path: string
}

const NavLinkButton: React.FC<PropsType> = ({ name, path }) => {
  const router: NextRouter = useRouter()
  return (
    <Link href={path}>
      <a
        className={`
          underline
          decoration-4
          ${
            router.pathname === path
              ? `text-sky-400`
              : 'text-white decoration-gray-500 hover:decoration-gray-100'
          }
          transition-color
          duration-300
        `}
      >
        {name}
      </a>
    </Link>
  )
}

export default NavLinkButton

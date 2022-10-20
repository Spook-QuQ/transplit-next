import routes from '@/lib/routes'

import NavLinkButton from './NavLinkButton'

type PropsType = {

}

const NavBar: React.FC<PropsType> = () => {
  return (
    <nav>
      <ul
        className="
          flex
          gap-2
          p-2
        "
      >
        {routes.map(route => {
          return (
            <li key={route.name}>
              <NavLinkButton
                name={route.name}
                path={route.path}
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default NavBar
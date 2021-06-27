import styled from 'styled-components'
import { navLinks } from '../../constants/route'
import { NavLink } from "react-router-dom"

import { LinkItem } from '../../style/index'

const Container = styled.div`
  width: 300px;
  height: 100vh;
  margin: 0 auto;
  background-color: var(--app--color--gray-lightest);
  position: fixed;
  top: 0;
  left: 0;
`
const AvatarArea = styled.div`
  width: 100%;
  height: 150px;
`

const LinkGroup = ({ links }) => {
  const role = Number(localStorage.getItem('role'))
  return (
    <ul>
      {
        links.filter(link => link.roles.includes(role)).map(({ to, name, icon }) => (
          <LinkItem key={name}>
            <NavLink to={to} activeClassName='active'>
              <span>{icon}</span>{name}
            </NavLink>
          </LinkItem>
        ))
      }
    </ul>
  )
}

export default function SidebarContainer() {
  return (
    <div>
      <Container>
        <AvatarArea />
        <LinkGroup links={navLinks} />
      </Container>
    </div>
  )
}
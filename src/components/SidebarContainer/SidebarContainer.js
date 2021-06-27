import styled from 'styled-components'
import { navLinks } from '../../constants/route'
import { NavLink } from "react-router-dom"

const Container = styled.div`
  width: 300px;
  height: 100vh;
  margin: 0 auto;
  background-color: var(--app--color--grey-lightest);
  position: fixed;
  top: 0;
  left: 0;
`
const AvatarArea = styled.div`
  width: 100%;
  height: 150px;
`
const LinkItem = styled.li`
  a {
    font-size: 18px;
    font-weight: 700;
    color: #666;
    display: flex;
    align-items: center;
    padding: var(--app--space--1) var(--app--space--6);

    &:hover, &.active {
      background-color: rgb(227, 226, 222);
      color: #333;
    }
  
    &.active:hover {
      background-color: rgb(197, 196, 192);
      color: #222;
    }
  }

  span {
    font-size: 24px;
    margin-right: 1rem;
  }
`

const LinkGroup = ({ links }) => (
  <ul>
    {
      links.map(({ to, name, icon }) => (
        <LinkItem>
          <NavLink to={to} activeClassName='active'>
            <span>{icon}</span>{name}
          </NavLink>
        </LinkItem>
      ))
    }
  </ul>
)

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
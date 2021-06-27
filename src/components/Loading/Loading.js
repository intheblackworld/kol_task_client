import styled from 'styled-components'
import CommonLogo from 'components/Icons/LogoIcon'
import 'assets/scheme.css'

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--app--color--dark-darker);
  color: var(--app--color--white);
  z-index: 1000;
`

const Logo = styled.div`
  width: auto;
  height: var(--app--space--9);
`

export default function Loading() {
  return (
    <Root isCenter>
      <Logo />
    </Root>
  )
}

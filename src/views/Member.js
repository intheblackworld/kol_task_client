import styled from 'styled-components'
import '../style/variables.css'

const Root = styled()`
  width: 100%;
  height: 100%;
  background-color: var(--app--color--dark-darker);
  color: var(--app--color--white);
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
`

export default function MemberView() {
  return (
    <Root>
      member
    </Root>
  )
}

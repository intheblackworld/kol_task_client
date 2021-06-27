// import { responsiveSm } from '../utils/index'
import styled from 'styled-components'

export const fontStyle = `
#root {
  font-family: 'PingFangTC', var(--app--font--family);
}
`

export const rootStyle = `
  width: 100vw;
  height: 100vh;
  background-color: var(--app--color--white);
`

export const wrapViewContainerStyle = `
background-color: var(--app--color--white);
`

export const ContentViewContainer = styled.div`
  width: calc(100% - 300px);
  height: 100%;
  overflow-y: scroll;
  background-color: var(--app--color--white);
  color: var(--app--color--dark);
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 300px;
`
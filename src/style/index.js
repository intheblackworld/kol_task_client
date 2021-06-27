import { responsiveSm } from '../utils/index'

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

export const routeViewContainerStyle = `
padding: var(--app--space--6);
background-color: var(--app--color--white);
${responsiveSm`
  padding: var(--app--space--4);
`}
`
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

export const LinkItem = styled.li`
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

export const TaskCardStyledWrapper = styled.div`
  width: 100%;
  height: 100px;
  padding: var(--app--space--4);
  border-radius: var(--app--space--2);
  margin-bottom: var(--app--space--2);
  box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 2px 4px;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: var(--app--color--gray-lightest);
  }
`
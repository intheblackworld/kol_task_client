import styled from 'styled-components'

const Label = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  color: #333;
  padding: 0 var(--app--space--2);
  border-radius: var(--app--space--1);
  margin: var(--app--space--2) 0;
`

export const TodoLabel = styled(Label)`
  background-color: var(--app--color--gray-lighter2);
`

export const ProgressLabel = styled(Label)`
  background-color: rgba(233, 168, 0, 0.2);
`

export const DoneLabel = styled(Label)`
  background-color: rgba(0, 135, 107, 0.2);
`

export default Label
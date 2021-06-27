import styled from 'styled-components'

export const GroupsStyleWrapper = styled.div`
  font-size: 18px;
  color: #000;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-top: var(--app--space--2);
  margin-left: var(--app--space--26);
`

export const GroupStyleWrapper = styled.div`
  border: 1px solid #000;
  padding: var(--app--space--1) var(--app--space--2);
  border-radius: 999px;
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin-right: var(--app--space--4);
  cursor: pointer;
`

const Groups = (props) => {
  return (
    <GroupsStyleWrapper>
      所屬組合：
      {props.groups && props.groups.map(g => (
          <GroupStyleWrapper>
            {g.name}
          </GroupStyleWrapper>
        ))
      }
    </GroupsStyleWrapper>
  )
}

export default Groups
import styled from 'styled-components'

const InnerContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

export default function SidebarContainer(
  props
) {
  const { children, ...domProps } = props
  console.log(domProps)
  return (
    <div {...domProps}>
      <InnerContainer>{children}</InnerContainer>
    </div>
  )
}
import styled from 'styled-components'

const InnerContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

export default function Container(
  props
) {
  const { children, ...domProps } = props
  return (
    <div {...domProps}>
      <InnerContainer>{children}</InnerContainer>
    </div>
  )
}
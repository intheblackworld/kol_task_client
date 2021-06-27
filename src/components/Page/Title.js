import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 300px;
  margin-left: var(--app--space--26);
  position: relative;
  border-bottom: 1px solid #cecece;
`

const Title = styled.div`
  font-size: 54px;
  color: #000;
  font-weight: bold;
  position: absolute;
  left: 0;
  bottom: 10px;
`

const Icon = styled.div`
  font-size: 80px;
  position: absolute;
  left: 8px;
  bottom: 82px;
`
export default function PageTitle({ name, icon }) {
  return <Container>
    <Title>
      {name}
    </Title>
    <Icon>
      {icon}
    </Icon>
  </Container>
}
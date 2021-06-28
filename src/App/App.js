import { lazy, Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { hot } from 'react-hot-loader'

// import tw from "tailwind-styled-components"
import styled, { css } from "styled-components"
import { Spin as Loading } from 'antd'

import SidebarContainer from '../components/SidebarContainer'
import Container from '../components/Container'


import RoutePath from '../constants'

import { fontStyle, rootStyle, wrapViewContainerStyle } from '../style/index'
import '../style/antd.less'
import '../style/variables.css'

const LoginView = lazy(() => import('../views/Login'))
const MemberView = lazy(() => import('../views/Member'))
const TaskListView = lazy(() => import('../views/TaskList'))
const TaskDetailView = lazy(() => import('../views/TaskDetail'))

const Root = styled.div`
  ${rootStyle}
`

const WrapViewContainer = styled(Container)`
  ${wrapViewContainerStyle}
`

function Wrapper() {
  return (
    <WrapViewContainer className="flex-1">
      <SidebarContainer>
      </SidebarContainer>
      <Switch>
        <Route path={RoutePath.MEMBER} component={MemberView} />
        <Route path={RoutePath.TASKLIST} component={TaskListView} />
        <Route path={RoutePath.TASKDETAIL} component={TaskDetailView} />
        <Redirect to={RoutePath.LOGIN} />
      </Switch>
    </WrapViewContainer >
  )
}

function App() {
  const globalStyle = css`
    ${fontStyle}
  `

  const Fallback = styled(Loading)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100px;
  `

  return (
    <>
      <style>{globalStyle}</style>
      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Root>
            <Route path={RoutePath.LOGIN} component={LoginView} />
            <Route component={Wrapper} />
          </Root>
        </Suspense>
      </BrowserRouter>

    </>
  )
}

export default hot(module)(App)

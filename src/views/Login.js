import { useState, useCallback } from "react"
import { useHistory } from "react-router-dom"
import { Form, Input, Button } from 'antd'
import styled from "styled-components"
import { responsiveSm } from '../utils/index'
import { gql, useMutation } from "@apollo/client"

import RoutePath from '../constants'
// import { isLoggedInVar } from '../cache/index'


// import { LoginForm, Loading } from "../components"

export const LOGIN_USER = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      token
    }
  }
`

// export default function Login() {
//   const [login, { loading, error }] = useMutation(LOGIN_USER, {
//     onCompleted({ login }) {
//       if (login) {
//         localStorage.setItem('token', login.token)
//         localStorage.setItem('userId', login.id)
//         // isLoggedInVar(true)
//       }
//     }
//   })

//   if (loading) return 'loading...'
//   if (error) return <p>An error occurred</p>
//   return <div>login</div>
//   // return <LoginForm login={login} />
// }


const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--app--color--dark);
`

const Content = styled.div`
  width: 500px;
  height: 300px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  ${responsiveSm`
    width: 95%;
    // margin: var(--app--space--4);
  `}
`

export default function Login() {
  const [inputs, setInputs] = useState('')
  const onChangeHandler = useCallback(
    ({ target: { id, value } }) => setInputs(state => ({ ...state, [id]: value }), [])
  )

  const history = useHistory()

  const login = () => {
    // @TODO 登入實作
    history.push(RoutePath.TASKLIST)
    console.log(inputs.form_name, inputs.form_password)
  }

  // const onNameChange = (e) => {
  //   const newName = e.target.value
  //   setName(newName)
  // }

  // const onPasswordChange = (e) => {
  //   const newPassword = e.target.value
  //   setPassword(newPassword)
  // }

  return (
    <Root>
      <Content>
        <Form
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="帳號"
            name="name"
            rules={[{ required: true, message: '請輸入帳號!' }]}
          >
            <Input
              value={inputs.name}
              onChange={onChangeHandler}
            />
          </Form.Item>

          <Form.Item
            label="密碼"
            name="password"
            rules={[{ required: true, message: '請輸入密碼!' }]}
          >
            <Input.Password
              value={inputs.password}
              onChange={onChangeHandler}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit" onClick={login}>
              登入
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Root>
  )
}
import { useState, useCallback } from "react"
import { useHistory } from "react-router-dom"
import { Form, Input, Button } from 'antd'
import styled from "styled-components"
import { responsiveSm } from '../utils/index'
import { useMutation } from "@apollo/client"
import { LOGIN_USER } from '../graphql/gql'

import RoutePath from '../constants'


const Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--app--color--dark);
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
`

const Content = styled.div`
  width: 500px;
  height: 600px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  ${responsiveSm`
    width: 95%;
    // margin: var(--app--space--4);
  `}
`

export default function Login() {
  const [inputs, setInputs] = useState('')
  const history = useHistory()
  const [login, { loading, error }] = useMutation(LOGIN_USER,
    {
      onCompleted({ login }) {
        if (login) {
          localStorage.setItem('token', login.token)
          localStorage.setItem('user', login._id)
          localStorage.setItem('role', login.role)
          localStorage.setItem('name', login.name)
        }
        history.push(RoutePath.TASKLIST)
      },
      onError(e) {
        window.alert(e)
      }
    })
  const onChangeHandler = useCallback(
    ({ target: { id, value } }) => setInputs(state => ({ ...state, [id]: value }), [])
  )
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
            label="信箱"
            name="email"
            rules={[{ required: true, message: '請輸入信箱!' }]}
          >
            <Input
              value={inputs.form_email}
              onChange={onChangeHandler}
            />
          </Form.Item>

          <Form.Item
            label="密碼"
            name="password"
            rules={[{ required: true, message: '請輸入密碼!' }]}
          >
            <Input.Password
              value={inputs.form_password}
              onChange={onChangeHandler}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit" onClick={() => login({
              variables: {
                email: inputs.form_email,
                password: inputs.form_password
              }
            })}>
              登入
            </Button>
          </Form.Item>
          <div>
            主管信箱密碼：<br />
            manager0@gmail.com<br />
            000000<br /><br />
            員工信箱密碼：<br />
            employee01@gmail.com<br />
            000000<br /><br />
            網紅信箱密碼
          </div>
        </Form>
      </Content>
    </Root>
  )
}
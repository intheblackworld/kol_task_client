import { useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import _ from 'lodash'

import PageTitle from '../components/Page/Title'
import { TodoLabel, ProgressLabel, DoneLabel } from '../components/Label/index'
import { navLinks } from '../constants/route'
import { Roles } from '../constants/index'
import { ContentViewContainer } from '../style/index'

import styled from 'styled-components'

import '../style/variables.css'

const { Option } = Select

const flex_c = `
  display: flex;
  align-items: center;
  justify-content: center;
`

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  padding-left: var(--app--space--26);
  padding-top: var(--app--space--12);
  padding-bottom: var(--app--space--12);
  position: relative;
`

const UserTitleStyledWrapper = styled.div`
  width: 100%;
  height: 36px;
  font-size: 20px;
  font-weight: 400;
  color: #999;
  ${flex_c}

  div {
    width: 25%;
    padding-left: var(--app--space--2);
    box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px;
  }
`

const UserTitle = () => {
  return (
    <UserTitleStyledWrapper>
      <div>名稱</div>
      <div>信箱</div>
      <div>身份</div>
      <div>所屬組合</div>
    </UserTitleStyledWrapper>
  )
}

const UserCardStyledWrapper = styled.div`
    width: 100%;
    height: 36px;
    display: flex;

    &:hover {
      background-color: var(--app--color--gray-lightest);
    }

    div {
      width: 25%;
      box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px;
      padding-left: var(--app--space--2);
      font-size: 20px;
      font-weight: bold;
      color: #333;
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `
const UserCard = ({
  name,
  email,
  role,
  groups
}) => {

  return (
    <UserCardStyledWrapper>
      <div>
        {name}
      </div>
      <div>
        {email}
      </div>
      <div>
        {Roles[role]}
      </div>
      <div>
        {/* {groups} */}
      </div>
    </UserCardStyledWrapper>
  )
}


const PlusButtonStyleWrapper = styled.div`
  width: 100px;
  padding: var(--app--space--1);
  border-radius: var(--app--space--1);
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  background-color: ${props => (props.group ? 'var(--app--color--red)' : 'var(--app--color--blue)')};;
  cursor: pointer;
  position: absolute;
  right: ${props => (props.group ? '160px' : '20px')};
  top: 4px;
  text-align: center;
`

const CreateUserButton = (props) => {
  return (
    <PlusButtonStyleWrapper onClick={() => props.setModal(true)}>
      + 新增人員
    </PlusButtonStyleWrapper>
  )
}

const CreateGroupButton = (props) => {
  return (
    <PlusButtonStyleWrapper onClick={() => props.setModal(true)} group>
      + 新增組合
    </PlusButtonStyleWrapper>
  )
}


const MaskStyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  z-index: 1001;
  background-color: rgba(0, 0, 0, .5);
  ${flex_c}
`

const ModalStyledWrapper = styled.div`
  width: 500px;
  height: 400px;
  background-color: #fff;
  border-radius: var(--app--space--4);
  ${flex_c}

  form {
    width: 100%;
  }
`

const GroupModal = (props) => {
  const [name, setName] = useState('')
  const onChangeHandler = (e) => {
    setName(e.target.value)
  }

  const addGroup = () => {
    props.setModal(false)
  }
  return (
    <MaskStyledWrapper>
      <ModalStyledWrapper>
        <Form
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="組合名稱"
            name="name"
            rules={[{ required: true, message: '請輸入組合名稱!' }]}
          >
            <Input
              value={name}
              onChange={onChangeHandler}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit" onClick={addGroup}>
              新增組合
            </Button>
          </Form.Item>
        </Form>
      </ModalStyledWrapper>
    </MaskStyledWrapper>
  )
}

const Modal = (props) => {
  const [inputs, setInputs] = useState('')

  const onChangeHandler = useCallback(
    ({ target: { id, value } }) => setInputs(state => ({ ...state, [id]: value }), [])
  )

  const addUser = () => {
    props.setModal(false)
  }
  return (
    <MaskStyledWrapper>
      <ModalStyledWrapper>
        <Form
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="人員名稱"
            name="name"
            rules={[{ required: true, message: '請輸入人員名稱!' }]}
          >
            <Input
              value={inputs.name}
              onChange={onChangeHandler}
            />
          </Form.Item>

          <Form.Item
            label="人員信箱"
            name="email"
          >
            <Input
              value={inputs.email}
              onChange={onChangeHandler}
            />
          </Form.Item>
          <Form.Item
            label="人員角色"
            name="description"
            rules={[{ required: true, message: '請選擇人員角色!' }]}
          >
            <Select
              placeholder="選擇人員角色"
              onChange={onChangeHandler}
            >
              <Option value="1">主管</Option>
              <Option value="2">員工</Option>
              <Option value="3">網紅</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="所屬組合"
            name="groups"
            rules={[
              {
                required: true,
                message: '請選擇所屬組合!',
                type: 'array',
              },
            ]}
          >
            <Select mode="multiple" placeholder="請選擇所屬組合">
              {props.groups && props.groups.map(g => (
                <Option value={g._id}>{g.name}</Option>
              ))
              }
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit" onClick={addUser}>
              新增人員
            </Button>
          </Form.Item>
        </Form>
      </ModalStyledWrapper>
    </MaskStyledWrapper>
  )
}


export default function MemberView() {
  const location = useLocation()
  const to = location.pathname

  const [isShowModal, setModal] = useState(false)
  const [isShowGroupModal, setGroupModal] = useState(false)

  return (
    <ContentViewContainer>
      {
        isShowModal && (
          <Modal setModal={setModal} />
        )
      }
      {
        isShowGroupModal && (
          <GroupModal setModal={setGroupModal} />
        )
      }
      <PageTitle {..._.find(navLinks, {
        to
      })} />
      <ScrollContainer>
        <CreateUserButton setModal={setModal} />
        <CreateGroupButton setModal={setGroupModal} />
        <UserTitle />
        <UserCard name="managermanagermanagermanager" email="m01@gmail.com" role={1} groups={[{ name: 'group0' }]} />
      </ScrollContainer>
    </ContentViewContainer>
  )
}

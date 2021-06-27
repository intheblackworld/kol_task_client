import { useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Form, Input, Button, Select } from 'antd'
import _ from 'lodash'

import PageTitle from '../components/Page/Title'
import { TodoLabel, ProgressLabel, DoneLabel } from '../components/Label/index'
import { navLinks } from '../constants/route'
import { ContentViewContainer } from '../style/index'

import styled from 'styled-components'

import '../style/variables.css'

const { Option } = Select

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  padding-left: var(--app--space--26);
  display: flex;
`

const Col = styled.div`
  width: 25%;
  margin: 0 var(--app--space--2);
  min-height: calc(100px * 2);
  padding-top: var(--app--space--4);
`

const TaskCardStyledWrapper = styled.div`
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
const TaskCard = (props) => {
  return (
    <TaskCardStyledWrapper>
      {props.title}
    </TaskCardStyledWrapper>
  )
}

const PlusButtonStyleWrapper = styled.div`
  width: 100%;
  padding: var(--app--space--1);
  border-radius: var(--app--space--1);
  font-size: 18px;
  font-weight: 500;
  color: #999;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }
`

const PlusButton = (props) => {
  console.log(props)
  // const showTaskModal = (props) => {
  //   // props.setModal(true)
  //   console.log(props)
  // }

  return (
    <PlusButtonStyleWrapper onClick={() => props.setModal(true)}>
      + New
    </PlusButtonStyleWrapper>
  )
}

const GroupsStyleWrapper = styled.div`
  font-size: 18px;
  color: #000;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-top: var(--app--space--2);
  margin-left: var(--app--space--26);
`

const GroupStyleWrapper = styled.div`
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


const MaskStyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  z-index: 1001;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalStyledWrapper = styled.div`
  width: 500px;
  height: 400px;
  background-color: #fff;
  border-radius: var(--app--space--4);
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    width: 100%;
  }
`

const Modal = (props) => {
  const [inputs, setInputs] = useState('')

  const onChangeHandler = useCallback(
    ({ target: { id, value } }) => setInputs(state => ({ ...state, [id]: value }), [])
  )

  const addTask = () => {
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
            label="任務名稱"
            name="title"
            rules={[{ required: true, message: '請輸入任務名稱!' }]}
          >
            <Input
              value={inputs.title}
              onChange={onChangeHandler}
            />
          </Form.Item>

          <Form.Item
            label="任務敘述"
            name="description"
          >
            <Input.TextArea
              value={inputs.description}
              onChange={onChangeHandler}
            />
          </Form.Item>
          <Form.Item
            label="任務狀態"
            name="description"
            rules={[{ required: true, message: '請選擇任務狀態!' }]}
          >
            <Select
              placeholder="選擇任務狀態"
              onChange={onChangeHandler}
            >
              <Option value="0">TODO</Option>
              <Option value="1">Process</Option>
              <Option value="2">Done</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="可見組合"
            name="groups"
            rules={[
              {
                required: true,
                message: '請選擇可見組合!',
                type: 'array',
              },
            ]}
          >
            <Select mode="multiple" placeholder="請選擇可見組合">
              { props.groups && props.groups.map(g => (
                  <Option value={g._id}>{g.name}</Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit" onClick={addTask}>
              新增任務
            </Button>
          </Form.Item>
        </Form>
      </ModalStyledWrapper>
    </MaskStyledWrapper>
  )
}


export default function TaskListView() {
  const location = useLocation()
  const to = location.pathname

  const [isShowModal, setModal] = useState(false)

  return (
    <ContentViewContainer>
      {
        isShowModal && (
          <Modal setModal={setModal} />
        )
      }
      <PageTitle {..._.find(navLinks, {
        to
      })} />
      <Groups groups={[{ name: 'group1' }, { name: 'group2' }]} />
      <ScrollContainer>
        <Col>
          <TodoLabel>
            Todo
          </TodoLabel>
          <TaskCard title="title1" />
          <PlusButton status={0} setModal={setModal} />
        </Col>
        <Col>
          <ProgressLabel>
            Progress
          </ProgressLabel>
          <TaskCard title="title2" />
          <PlusButton status={1} setModal={setModal} />
        </Col>
        <Col>
          <DoneLabel>
            Done
          </DoneLabel>
          <TaskCard title="title3" />
          <PlusButton status={2} setModal={setModal} />
        </Col>
      </ScrollContainer>
    </ContentViewContainer>
  )
}

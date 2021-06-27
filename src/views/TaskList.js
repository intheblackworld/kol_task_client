import { useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useMutation, useQuery } from "@apollo/client"
import { Form, Input, Button, Select } from 'antd'
import _ from 'lodash'

import PageTitle from '../components/Page/Title'
import Groups from '../components/Groups/index'
import { TodoLabel, ProgressLabel, DoneLabel } from '../components/Label/index'
import { navLinks } from '../constants/route'
import { ContentViewContainer, TaskCardStyledWrapper } from '../style/index'
import { GET_TASKS, CREATE_TASK, GET_USER, GET_GROUP } from '../graphql/gql'

import styled from 'styled-components'

import '../style/variables.css'

const { Option } = Select

export const ScrollContainer = styled.div`
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
  return (
    <PlusButtonStyleWrapper onClick={() => props.setModal(true)}>
      + New
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
    (e) => {
      if (!e.target) {
        setInputs(state => ({ ...state, status: e }))
      } else {
        setInputs(state => ({ ...state, [e.target.id]: e.target.value }))
      }
    }, [])

  const [addTask, { loading, error }] = useMutation(CREATE_TASK,
    {
      onCompleted({ createGroup }) {
        props.setModal(false)
      },
      onError(e) {
        window.alert(e)
      }
    })
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
            name="status"
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

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit" onClick={() => {
              addTask({
                variables: {
                  createdBy: localStorage.getItem('userId'),
                  title: inputs.form_title,
                  description: inputs.form_description,
                  status: Number(inputs.status),
                  groups: [...props.user.groups.map(g => g._id)]
                }
              })
            }}>
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

  // const { data, loading, error } = useQuery(GET_TASKS)
  const { data: userData, loading, error } = useQuery(GET_USER, {
    variables: { id: localStorage.getItem('userId') },
  })
  // if (loading) return 'Loading...'
  // if (error) {
  //   window.alert(error)
  // }
  // const { tasks } = data
  if (loading) return 'Loading...'
  if (error) {
    window.alert(error)
  }

  const { user } = userData
  const tasks = _.flatten(user.groups.map(group => group.tasks))

  let taskGroups = {
    [0]: [],
    [1]: [],
    [2]: []
  }



  taskGroups = {
    ...taskGroups,
    ..._.groupBy(tasks, task => task.status)
  }


  return (
    <ContentViewContainer>
      {
        isShowModal && (
          <Modal user={user} setModal={setModal} />
        )
      }
      <PageTitle {..._.find(navLinks, {
        to
      })} />
      <Groups groups={user.groups} />
      <ScrollContainer>
        {
          Object.values(taskGroups).map(
            (tasks, index) => (
              <Col key={'col' + index}>
                {index === 0 && <TodoLabel>
                  Todo
                </TodoLabel>}
                {index === 1 && <ProgressLabel>
                  Progress
                </ProgressLabel>}
                {index === 2 && <DoneLabel>
                  Done
                </DoneLabel>}
                {
                  tasks.map(task => (<TaskCard key={task._id} title={task.title} />))
                }

                <PlusButton status={index} setModal={setModal} />
              </Col>
            ))
        }

        {/* <Col>

          <TaskCard title="title2" />
          <PlusButton status={1} setModal={setModal} />
        </Col>
        <Col>
          <DoneLabel>
            Done
          </DoneLabel>
          <TaskCard title="title3" />
          <PlusButton status={2} setModal={setModal} />
        </Col> */}
      </ScrollContainer>
    </ContentViewContainer>
  )
}

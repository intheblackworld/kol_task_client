import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password}) {
    _id
    name
    email
    role
    token
    groups {
      name
    }
  }
}
`

export const CREATE_USER = gql`
  mutation createUser(
    $email: String!,
    $name: String!,
    $password: String!,
    $role: Int!
  ) {
    createUser(data: {email: $email, name: $name, password: $password, role: $role}) {
      email
      name
      role
      groups {
        _id
        name
      }
    }
}
`

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      name
      email
      role
      groups {
        _id
        name
      }
    }
  }
`

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      name
      email
      role
      groups {
        _id
        name

        tasks {
          _id
          title
          description
          status
        }
      }
    }
  }
`

export const GET_GROUPS = gql`
  query getGroups {
    groups {
      _id
      name
      members {
        name
      }
      tasks {
        title
      }
    }
  }
`


export const GET_GROUP = gql`
  query getGroup($id: ID!) {
    group(id: $id) {
      _id
      name
      members {
        name
      }
      tasks {
        title
      }
    }
  }
`

export const CREATE_GROUP = gql`
mutation createGroup($createdBy: ID!, $name: String!) {
  createGroup(data: {createdBy: $createdBy, name: $name}) {
    name
    _id
  }
}
`

export const ADD_GROUP_TO_USER = gql`
mutation addGroupToUser($userId: ID!, $groupId: ID!) {
  addGroupToUser(data: {userId: $userId, groupId: $groupId}) {
    _id
    name
    groups {
      _id
      name
    }
  }
}
`

export const GET_TASKS = gql`
  query getTasks {
    tasks {
      _id
      createdBy
      title
      description
      status
      groups {
        _id
        members {
          _id
          name
        }
        tasks {
          _id
        }
      }
    }
  }
`

export const CREATE_TASK = gql`
mutation createTask($createdBy: ID!, $title: String!, $description: String!, $status: Int!, $group: [ID]) {
  createTask(data: {createdBy: $createdBy, title: $title, description: $description, status: $status, groups: $group}) {
    _id
    title
    description
    status
    groups
  }
}
`
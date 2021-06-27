import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, gql } from "@apollo/client"


import './index.css'
import App from './App/index'
import { cache } from './cache/index'
import reportWebVitals from './reportWebVitals'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',  //指定API網址
  cache, //建立 cache
  typeDefs,
  headers: {
    authorization: localStorage.getItem('token') || ''
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

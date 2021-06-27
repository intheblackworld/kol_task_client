import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, createHttpLink, gql, from, HttpLink } from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { setContext } from '@apollo/client/link/context';




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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',  //指定API網址
  cache, //建立 cache
  typeDefs,
  link: from([errorLink, httpLink, authLink]),
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

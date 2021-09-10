import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql', cache: new InMemoryCache() })

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

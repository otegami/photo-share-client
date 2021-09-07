import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { gql } from 'apollo-boost'

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' })

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// const query = gql`
//   {
//     totalUsers
//     totalPhotos
//   }
// `

// client.query({query})
//   .then(({ data }) => console.log('data', data))
//   .then(console.error)

// console.log('cache', client.extract())
// client.query({query})
//   .then(() => console.log('cache', client.extract()))
//   .catch(console.error)

// let mutation = `
//   mutation populate($count: Int!) {
//     addFakeUsers(count: $count) {
//       githubLogin
//       avatar
//       name
//     }
//   }
// `

// const App = ({ users = [] }) => {
//   return(
//     <div>
//       {users.map(user =>
//         <div key={user.githubLogin}>
//           <img src={user.avatar} alt="" />
//           {user.name}
//         </div>
//       )}
//       <button  onClick={addUser}>Add User</button>
//     </div>
//   )
// }

// const render = ({ allUsers = [] }) =>
//   ReactDOM.render(
//       <App users={allUsers} />,
//     document.getElementById('root')
//   )

// const addUser = () =>
//   request(url, mutation, {count: 1})
//     .then(requestAndRendar)
//     .catch(console.error)

// const requestAndRendar = () =>
//   request(url, query)
//     .then(render)
//     .catch(console.error)

// requestAndRendar()

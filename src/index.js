import React from 'react'
import ReactDOM from 'react-dom'
import { request } from 'graphql-request'

const url = 'http://localhost:4000/graphql'

let query = `
  query listUsers {
    allUsers {
      avatar
      name
      githubLogin
    }
  }
`

let mutation = `
  mutation populate($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      avatar
      name
    }
  }
`

const App = ({ users = [] }) => {
  return(
    <div>
      {users.map(user =>
        <div key={user.githubLogin}>
          <img src={user.avatar} alt="" />
          {user.name}
        </div>
      )}
      <button  onClick={addUser}>Add User</button>
    </div>
  )
}

const render = ({ allUsers = [] }) =>
  ReactDOM.render(
      <App users={allUsers} />,
    document.getElementById('root')
  )

const addUser = () =>
  request(url, mutation, {count: 1})
    .then(requestAndRendar)
    .catch(console.error)

const requestAndRendar = () =>
  request(url, query)
    .then(render)
    .catch(console.error)

requestAndRendar()

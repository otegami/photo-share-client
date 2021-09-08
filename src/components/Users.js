import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { ROOT_QUERY } from './App'
import { gql } from 'apollo-boost'

const Users = () => {
  return(
    <Query query={ROOT_QUERY}>
      {({ data, loading, refetch }) => loading ?
        <p>loading users...</p> :
        <UserList
          count={data.totalUsers}
          users={data.allUsers}
          refetchUsers={refetch}/>
      }
    </Query>
  )
}

const UserList = ({ count, users, refetchUsers }) => {
  return(
    <div>
      <p>{count} Users</p>
      <button onClick={() => refetchUsers()}>Refetch Users</button>
      <Mutation
        mutation={ADD_FAKE_USERS_MUTATION}
        variables={{ count: 1 }}
        refetchQueries={[{ query: ROOT_QUERY }]}
      >
        {addFakeUsers =>
          <button onClick={addFakeUsers}>Add Fake Users</button>
        }
      </Mutation>
      <ul>
        {users.map(user =>
          <UserListItem
            key={user.githubLogin}
            name={user.name}
            avatar={user.avatar} />
        )}
      </ul>
    </div>
  )
}

const UserListItem = ({ name, avatar }) => {
  return(
    <li>
      <img src={avatar} width={48} height={48} alt="" />
      {name}
    </li>
  )
}

const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`

export default Users
import React from 'react'
import { ROOT_QUERY } from './App'
import { gql, useQuery, useMutation } from "@apollo/client"

const Users = () => {
  const { data, loading, refetch } = useQuery(ROOT_QUERY)
  return(
    loading ?
      <p>loading users...</p> :
      <UserList
        count={data.totalUsers}
        users={data.allUsers}
        refetchUsers={refetch}/>
  )
}

const UserList = ({ count, users, refetchUsers }) => {
  const [addFakeUser] = useMutation(
    ADD_FAKE_USERS_MUTATION,
    {
      variables: { count: 1 },
      refetchQueries: [ROOT_QUERY] }
  )

  return(
    <div>
      <p>{count} Users</p>
      <button onClick={() => refetchUsers()}>Refetch Users</button>
      <button onClick={() => addFakeUser()}>Add Fake Users</button>
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

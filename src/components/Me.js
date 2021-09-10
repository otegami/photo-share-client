import { useQuery } from '@apollo/client'
import { ROOT_QUERY } from './App'

const Me = ({ logout, requestCode, signingIn }) => {
  const { data, loading } = useQuery(ROOT_QUERY)

  return(
    data && data.me ?
      <CurrentUser
        {...data.me}
        logout={logout}
      /> :
      loading ?
        <p>loading...</p> :
        <button
          onClick={requestCode}
          disabled={signingIn}
        >
          Sign In with Github
        </button>
  )
}

const CurrentUser = ({ name, avatar, logout }) => {
  return(
    <div>
      <img src={avatar} width={48} height={48} alt="" />
      <h1>{name}</h1>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Me

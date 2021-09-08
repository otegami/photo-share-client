import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { ROOT_QUERY } from './App'

const AuthorizedUser = () => {
  const [signingIn, setSiginingIn] = useState(false)
  const history = useHistory()

  const GITHUB_AUTH_MUTATION = gql`
    mutation githubAuth($code: String!) {
      githubAuth(code: $code) { token }
    }
  `

  const authorizationComplete = (cache, { data }) => {
    localStorage.setItem('token', data.githuAuth.token)
    history.replace('/')
    setSiginingIn(false)
  }

  useEffect(() => {
    if(window.location.search.match(/code=/)) {
      setSiginingIn(true)
      const code = window.location.search.replace("?code=", "")
      githubAuthMutation({varibales: {code}})
      history.replace('/')
    }
  })

  const requestCode = () => {
    const clientID = process.env.REACT_APP_CLIENT_ID
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`
  }

  return(
    <Mutation
      mutation={GITHUB_AUTH_MUTATION}
      update={authorizationComplete()}
      refetchQueries={[{ query: ROOT_QUERY }]}
    >
      {mutation => {
        githubAuthMutation = mutation
        return(
          <button
            onClick={() => requestCode()}
            disabled={signingIn}
          >
            Sign In with GitHUb
          </button>
        )
      }}
    </Mutation>
  )
}

export default withRouter(AuthorizedUser)

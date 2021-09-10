import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import { ROOT_QUERY } from './App'

const AuthorizedUser = () => {
  const [signingIn, setSiginingIn] = useState(false)
  const history = useHistory()
  const GITHUB_AUTH_MUTATION = gql`
    mutation githubAuth($code: String!) {
      githubAuth(code: $code) { token }
    }
  `
  const [authorizeByGithub] = useMutation(
    GITHUB_AUTH_MUTATION,
    {
      update(cache, result) {
        localStorage.setItem('token', result.data.githubAuth.token)
        setSiginingIn(false)
        history.replace('/')
      },
      refetchQueries: [ROOT_QUERY]
    }
  )

  useEffect(() => {
    if(window.location.search.match(/code=/)) {
      setSiginingIn(true)
      const code = window.location.search.replace("?code=", "")
      authorizeByGithub({ variables: { code } })
    }
  }, [authorizeByGithub])

  const requestCode = () => {
    const clientID = process.env.REACT_APP_CLIENT_ID
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`
  }

  return(
    <button
      onClick={() => requestCode()}
      disabled={signingIn}
    >
      Sign In with GitHUb
    </button>
  )
}

export default withRouter(AuthorizedUser)

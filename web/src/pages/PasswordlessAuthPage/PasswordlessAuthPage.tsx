import { useEffect, useState } from 'react'

import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import SendTokenForm from '../../components/SendToken/SendToken'
import SignInToken from '../../components/SignInToken/SignInToken'
import SignUpToken from '../../components/SignUpForm/SignUpForm'

const LoginPasswordlessPage = () => {
  const [waitingForCode, setWaitingForCode] = useState(false)
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [signUp, setSignUp] = useState(false)
  const { code, email: userEmail } = useParams()

  useEffect(() => {
    if (code && userEmail) {
      setWaitingForCode(true)
      setToken(code)
      setEmail(userEmail)
    }
  }, [code, userEmail])

  return (
    <>
      <MetaTags
        title="LoginPasswordless"
        description="LoginPasswordless page"
      />

      {!waitingForCode && !email && signUp && (
        <SignUpToken setEmail={setEmail} setSignUp={setSignUp} />
      )}

      {!waitingForCode && !signUp && (
        <SignInToken
          email={email}
          setWaitingForCode={setWaitingForCode}
          setSignUp={setSignUp}
          setEmail={setEmail}
        />
      )}

      {waitingForCode || token ? (
        <SendTokenForm email={email} token={token} />
      ) : null}
    </>
  )
}

export default LoginPasswordlessPage

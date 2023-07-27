import { useEffect } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

interface SignInTokenFormProps {
  email: string
}

const GENERATE_LOGIN_TOKEN = gql`
  mutation generateLoginToken($email: String!) {
    generateLoginToken(email: $email) {
      message
    }
  }
`

const SignInTokenForm = ({ setWaitingForCode, email, setSignUp, setEmail }) => {
  const [generateLoginToken] = useMutation(GENERATE_LOGIN_TOKEN, {
    onCompleted: () => {
      toast.success('Check your email for a login link')
      setWaitingForCode(true)
    },
  })

  const onSubmit = async (data: SignInTokenFormProps) => {
    const response = await generateLoginToken({
      variables: { email: data.email },
      fetchPolicy: 'no-cache',
    })
    if (response.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message)
      })
    }
    setEmail(data.email)
  }

  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
    if (email) {
      console.log('email', email)
    }
  }, [isAuthenticated, email, logIn])

  return (
    <>
      <MetaTags title="Login" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <div className="flex max-w-md flex-col rounded-md p-6 dark:bg-gray-900 dark:text-gray-100 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Email</h1>
          <p className="text-sm dark:text-gray-400">
            Please, confirm your email to sign in
          </p>
        </div>
        <Form action="" className="space-y-12" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between">
                <Label name="email" className="text-sm">
                  Email
                </Label>
              </div>
              <TextField
                name="email"
                defaultValue={email}
                placeholder="john.doe@fakeemail.com"
                className="w-full rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                validation={{
                  required: true,
                  pattern: {
                    message: 'Please enter a valid email address',
                    value: /[^@]+@[^.]+\..+/,
                  },
                }}
              />
              <FieldError name="email" className="rw-field-error" />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <Submit className="w-full rounded-md px-8 py-3 font-semibold dark:bg-violet-400 dark:text-gray-900">
                Send Token
              </Submit>
            </div>
          </div>
        </Form>
        <div className="pt-5">
          <div className="flex justify-center">
            <span>Still dont have an account?</span>
            <button
              onClick={() => setSignUp(true)}
              className="dark:via-violet-60 inline px-2 font-medium text-violet-500 hover:text-violet-800"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInTokenForm

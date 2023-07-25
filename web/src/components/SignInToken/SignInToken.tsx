import { useEffect } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const GENERATE_LOGIN_TOKEN = gql`
  mutation generateLoginToken($email: String!) {
    generateLoginToken(email: $email) {
      message
    }
  }
`

const SignInTokenForm = ({ setWaitingForCode, email }) => {
  const [generateLoginToken] = useMutation(GENERATE_LOGIN_TOKEN, {
    onCompleted: () => {
      toast.success('Check your email for a login link')
      setWaitingForCode(true)
    },
  })

  const onSubmit = async (data) => {
    const response = await generateLoginToken({
      variables: { email: data.email },
      fetchPolicy: 'no-cache',
    })
    if (response.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message)
      })
    }
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
      </div>
    </>
  )
}

export default SignInTokenForm

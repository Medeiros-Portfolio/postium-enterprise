import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

import { useAuth } from '../../auth'

interface SignUpTokenFormProps {
  name: string
  email: string
}

const SignUpTokenForm = ({ setEmail }) => {
  const { signUp } = useAuth()

  const onSubmit = async (data: SignUpTokenFormProps) => {
    setEmail(data.email)

    const response = await signUp({
      name: data.name,
      username: data.email,
      password:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
    })
    console.log('response', response)
    toast.success('User created')
  }

  return (
    <>
      <MetaTags title="Login" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <div className="flex max-w-md flex-col rounded-md p-6 dark:bg-gray-900 dark:text-gray-100 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm dark:text-gray-400">
            Please, enter your name and email to sign up
          </p>
        </div>
        <Form action="" className="space-y-12" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between">
                <Label name="name" className="text-sm">
                  Name
                </Label>
              </div>
              <TextField
                name="name"
                placeholder="John Doe"
                className="w-full rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                validation={{ required: true }}
              />
              <FieldError name="name" className="rw-field-error" />
            </div>
            <div>
              <div className="mb-2 flex justify-between">
                <Label name="email" className="text-sm">
                  Email
                </Label>
              </div>
              <TextField
                name="email"
                placeholder="john.doe@fakeemail.com"
                className="w-full rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                validation={{ required: true }}
              />
              <FieldError name="email" className="rw-field-error" />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <Submit className="w-full rounded-md px-8 py-3 font-semibold dark:bg-violet-400 dark:text-gray-900">
                Sign Up
              </Submit>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

export default SignUpTokenForm

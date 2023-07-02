import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  SubmitHandler,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import {
  Toaster,
  toast,
  resolveValue,
  ToastBar,
} from '@redwoodjs/web/dist/toast'

import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from '../../../types/graphql'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

interface ContactFormValues {
  name: string
  email: string
  message: string
}

const ContactPage = () => {
  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your message!')
      formMethods.reset()
    },
  })

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    create({ variables: { input: data } })
  }

  const formMethods = useForm({ mode: 'onBlur' })

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <div className="flex max-w-2xl gap-6 divide-x divide-gray-700 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100">
                <div className="flex flex-1 flex-col border-l-8 p-4 dark:border-violet-400">
                  <span className="text-2xl">Success</span>
                  <span className="text-xs dark:text-gray-400">
                    {resolveValue(message, t)}
                  </span>
                </div>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="tracki flex items-center px-4 text-xs uppercase dark:border-gray-700 dark:text-gray-400"
                >
                  Dismiss
                </button>
              </div>
            )}
          </ToastBar>
        )}
      </Toaster>
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-8 rounded-lg px-8 py-16 dark:bg-gray-800 dark:text-gray-100 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32">
        <div className="flex flex-col justify-between">
          <div className="space-y-2">
            <h2 className="leadi text-4xl font-bold lg:text-5xl">
              Let's talk!
            </h2>
            <div className="dark:text-gray-400">
              Vivamus in nisl metus? Phasellus.
            </div>
          </div>
          <img src="contact_doodle.svg" alt="" className="h-52 p-6 md:h-64" />
        </div>
        <Form
          className="space-y-6"
          config={{ mode: 'onBlur' }}
          onSubmit={onSubmit}
          error={error}
          formMethods={formMethods}
        >
          <FormError error={error} />
          <div>
            <Label name="name" className="text-sm">
              Full name
            </Label>
            <TextField
              name="name"
              placeholder="Leroy Jenkins"
              className="w-full rounded p-3 dark:bg-gray-800"
              validation={{
                required: 'Please enter your name',
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Please enter a valid name',
                },
                minLength: 3,
              }}
              errorClassName="w-full rounded p-3 dark:bg-gray-800 border-2 border-red-500"
            />
            <FieldError name="name" className="text-red-600" />
          </div>
          <div>
            <Label name="email" className="text-sm">
              Email
            </Label>
            <TextField
              name="email"
              className="w-full rounded p-3 dark:bg-gray-800"
              placeholder="leroy@jenkins.com"
              validation={{
                required: true,
                pattern: {
                  value: /[^@]+@[^.]+\..+/,
                  message: 'Please enter a valid email',
                },
              }}
              errorClassName="w-full rounded p-3 dark:bg-gray-800 border-2 border-red-500"
            />
            <FieldError name="email" className="text-red-600" />
          </div>
          <div>
            <Label name="message" className="text-sm">
              Message
            </Label>
            <TextAreaField
              rows={3}
              name="message"
              className="w-full rounded p-3 dark:bg-gray-800"
              placeholder='Hi, I would like to talk about "X"'
              validation={{
                required: true,
                minLength: 5,
              }}
              errorClassName="w-full rounded p-3 dark:bg-gray-800 border-2 border-red-500"
            ></TextAreaField>
            <FieldError name="message" className="text-red-600" />
          </div>
          <Submit
            className="tracki w-full rounded p-3 text-sm font-bold uppercase dark:bg-violet-400 dark:text-gray-900"
            disabled={loading}
          >
            Send Message
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default ContactPage

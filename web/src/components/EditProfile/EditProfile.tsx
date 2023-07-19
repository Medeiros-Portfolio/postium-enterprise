import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import {
  UpdateUserEmailMutation,
  UpdateUserEmailMutationVariables,
  UpdateUserNameMutation,
  UpdateUserNameMutationVariables,
} from '../../../types/graphql'
import { useAuth } from '../../auth'

type ProfileProps = {
  avatar: string
  name: string
  email: string
}

const UPDATE_USER_EMAIL = gql`
  mutation UpdateUserEmailMutation($id: String!, $email: String!) {
    updateUserEmail(id: $id, email: $email) {
      id
    }
  }
`

const UPDATE_USER_NAME = gql`
  mutation UpdateUserNameMutation($id: String!, $name: String!) {
    updateUserName(id: $id, name: $name) {
      id
    }
  }
`

interface UpdateEmailFormValues {
  email: string
}

interface UpdateNameFormValues {
  name: string
}

const EditProfile = (userProfileProps: ProfileProps) => {
  const formMethods = useForm({ mode: 'onBlur' })

  const { currentUser } = useAuth()

  const [updateUserEmail, { loading: emailLoading, error: emailError }] =
    useMutation<UpdateUserEmailMutation, UpdateUserEmailMutationVariables>(
      UPDATE_USER_EMAIL,
      {
        onCompleted: () => {
          formMethods.reset()
          window.location.reload()
        },
      }
    )

  const onSubmitEmailUpdate = (data: UpdateEmailFormValues) => {
    updateUserEmail({
      variables: {
        id: currentUser?.id || '',
        email: data.email || '',
      },
    })
  }

  const [updateUserName, { loading: nameLoading, error: nameError }] =
    useMutation<UpdateUserNameMutation, UpdateUserNameMutationVariables>(
      UPDATE_USER_NAME,
      {
        onCompleted: () => {
          formMethods.reset()
          window.location.reload()
        },
      }
    )

  const onSubmitNameUpdate = (data: UpdateNameFormValues) => {
    updateUserName({
      variables: {
        id: currentUser?.id || '',
        name: data.name || '',
      },
    })
  }

  return (
    <>
      <div className="flex max-w-xs flex-col justify-center rounded-xl p-6 shadow-md dark:bg-gray-900 dark:text-gray-100 sm:px-12">
        <p className="pb-4 text-center text-3xl text-violet-300 underline">
          Edit your profile
        </p>
        <img
          src={userProfileProps.avatar}
          alt=""
          className="mx-auto aspect-square h-32 w-32 rounded-full hover:cursor-pointer hover:border-2 dark:bg-gray-500"
        />
        <div className="space-y-4 divide-y divide-gray-700 text-center">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {userProfileProps.name}
            </h2>
            <p className="px-5 text-xs dark:text-gray-400 sm:text-base">
              {userProfileProps.email}
            </p>
          </div>
        </div>
        <fieldset className=" grid grid-cols-4 gap-6 border-t-2 p-2 shadow-sm dark:bg-gray-900">
          <Form
            onSubmit={onSubmitNameUpdate}
            formMethods={formMethods}
            className="col-span-full"
          >
            <FormError
              error={nameError}
              titleStyle={{ opacity: 0 }}
              listItemClassName="text-red-600 dark:text-red-400"
            />

            <div className="col-span-4">
              <Label name="name" className="text-sm">
                Name
              </Label>
              <TextField
                name="name"
                placeholder={currentUser.name}
                className="focus:ri focus:ri w-full rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              />
              <FieldError name="name" className="text-red-600" />
            </div>
            <Submit
              disabled={nameLoading}
              className=" my-3 max-w-xs rounded-md py-4 font-semibold dark:bg-violet-400 dark:text-gray-900"
            >
              Update
            </Submit>
          </Form>
          <Form
            onSubmit={onSubmitEmailUpdate}
            formMethods={formMethods}
            className="col-span-full"
          >
            <FormError
              error={emailError}
              titleStyle={{ opacity: 0 }}
              listItemClassName="text-red-600 dark:text-red-400"
            />

            <div className="col-span-4">
              <Label name="email" className="text-sm">
                Email
              </Label>
              <TextField
                name="email"
                placeholder={currentUser.email}
                className="focus:ri focus:ri w-full rounded-md focus:ring dark:border-gray-700 dark:text-gray-900"
              />
              <FieldError name="email" className="text-red-600" />
            </div>
            <Submit
              disabled={emailLoading}
              className=" my-3 max-w-xs rounded-md py-4 font-semibold dark:bg-violet-400 dark:text-gray-900"
            >
              Update
            </Submit>
          </Form>
        </fieldset>
      </div>
    </>
  )
}

export default EditProfile

import { useState } from 'react'

import { Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'

import { QUERY as USERS_QUERY } from 'src/components/UsersCell/UsersCell'

import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  UpdateRoleMutation,
  UpdateRoleMutationVariables,
} from '../../../types/graphql'
import { rolesFormatter } from '../../lib/rolesFormatter'
import { thumbnail } from '../../lib/thumbnail'

type UserProps = {
  id: string
  name: string
  email: string
  avatar: string
  roles: string[]
}

const DELETE_USER = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const UPDATE_ROLE = gql`
  mutation UpdateRoleMutation($id: String!, $role: String!) {
    updateRole(id: $id, role: $role) {
      id
    }
  }
`

const User = (user: UserProps) => {
  const [showButtons, setShowButtons] = useState(false)

  const [deleteUser, { loading: deleteLoading }] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(DELETE_USER, {
    refetchQueries: [{ query: USERS_QUERY }],
  })

  const onDeleteUser = (id: string) => {
    deleteUser({ variables: { id } })
  }

  const [updateRole, { loading: updateLoading }] = useMutation<
    UpdateRoleMutation,
    UpdateRoleMutationVariables
  >(UPDATE_ROLE, {
    refetchQueries: [{ query: USERS_QUERY }],
  })

  return (
    <div className="mb-4 flex max-w-sm flex-col justify-center rounded-xl p-6 shadow-md hover:scale-105 dark:bg-gray-900 dark:text-gray-100 sm:px-12">
      <button onClick={() => setShowButtons(!showButtons)}>
        <img
          src={thumbnail(user.avatar)}
          alt=""
          className="mx-auto aspect-square h-32 w-32 rounded-full dark:bg-gray-500"
        />
        <div className="space-y-4 divide-y divide-gray-700 text-center">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">{user.name}</h2>
            <p className="px-5 text-xs dark:text-gray-400 sm:text-base">
              {user.email}
            </p>
            <div className="border-t-2 border-solid border-violet-900">
              <p className="px-5 text-xs dark:text-gray-400 sm:text-base">
                {rolesFormatter(user.roles)}
              </p>
            </div>
          </div>
        </div>
      </button>
      {showButtons && (
        <div className="flex flex-row justify-center space-x-4">
          {!user.roles.includes('admin') ? (
            <Submit
              disabled={updateLoading}
              className="rounded bg-violet-500 px-4 py-2 font-bold text-white hover:bg-violet-700"
              onClick={() =>
                updateRole({ variables: { id: user.id, role: 'admin' } })
              }
            >
              Make Admin
            </Submit>
          ) : null}
          {!user.roles.includes('writer') && !user.roles.includes('admin') ? (
            <Submit
              disabled={updateLoading}
              className="rounded bg-violet-500 px-4 py-2 font-bold text-white hover:bg-violet-700"
              onClick={() =>
                updateRole({ variables: { id: user.id, role: 'writer' } })
              }
            >
              Make Writer
            </Submit>
          ) : null}
          <Submit
            onClick={() => onDeleteUser(user.id)}
            className="rounded bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-500"
            disabled={deleteLoading}
          >
            Delete
          </Submit>
        </div>
      )}
    </div>
  )
}

export default User

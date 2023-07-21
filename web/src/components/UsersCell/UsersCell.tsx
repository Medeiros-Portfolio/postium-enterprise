import type { UsersQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import User from '../User/User'

export const QUERY = gql`
  query UsersQuery {
    users {
      id
      name
      email
      roles
      avatar
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users }: CellSuccessProps<UsersQuery>) => {
  return (
    <ul>
      {users.map((user, i) => {
        return (
          <User
            id={user.id}
            avatar={user.avatar}
            email={user.email}
            name={user.name}
            roles={user.roles}
            key={i}
          />
        )
      })}
    </ul>
  )
}

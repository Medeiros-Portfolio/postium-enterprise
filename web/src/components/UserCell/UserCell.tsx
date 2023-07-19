import type { FindUserQuery, FindUserQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EditProfile from '../EditProfile/EditProfile'

export const QUERY = gql`
  query FindUserQuery($id: String!) {
    user: user(id: $id) {
      name
      email
      avatar
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindUserQuery, FindUserQueryVariables>) => {
  return (
    <EditProfile avatar={user.avatar} email={user.email} name={user.name} />
  )
}

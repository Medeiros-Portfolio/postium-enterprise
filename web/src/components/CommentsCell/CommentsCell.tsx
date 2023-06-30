import type { CommentsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Comment from 'src/components/Comment/Comment'

export const QUERY = gql`
  query CommentsQuery($postId: Int!) {
    comments(postId: $postId) {
      id
      name
      message
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ comments }: CellSuccessProps<CommentsQuery>) => {
  return (
    // Add a heading writen 'Comments' above the list of comments:
    <>
      <h2 className="py-4 text-2xl font-semibold md:ml-24 lg:ml-32">
        Comments
      </h2>
      <ul>
        {comments.map((comment) => {
          return (
            <li className="pb-3" key={comment.id}>
              <Comment
                id={comment.id}
                name={comment.name}
                message={comment.message}
                createdAt={comment.createdAt}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

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

export const Loading = () => (
  <section className="flex h-full items-center p-10 dark:text-gray-100">
    <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
      <div className="w-60 animate-pulse rounded py-4 shadow-md dark:bg-gray-900 sm:w-80">
        <div className="flex space-x-4 p-4 sm:px-8">
          <div className="h-5 w-full rounded dark:bg-gray-700"></div>
        </div>
        <div className="space-y-4 p-4 sm:px-8">
          <div className="h-4 w-full rounded dark:bg-gray-700"></div>
          <div className="h-4 w-full rounded dark:bg-gray-700"></div>
          <div className="h-4 w-3/4 rounded dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  </section>
)

export const Empty = () => (
  <>
    <h2 className="py-4 text-2xl font-semibold md:ml-24 lg:ml-32">Comments</h2>
    <div className="container mx-auto my-2 flex w-full max-w-lg flex-col divide-y divide-gray-700 rounded-md p-2 dark:bg-gray-900 dark:text-gray-100">
      <div className="space-y-2 p-4 text-sm dark:text-gray-400">
        <p>There are no comments yet. Be the first one!</p>
      </div>
    </div>
  </>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ comments }: CellSuccessProps<CommentsQuery>) => {
  return (
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
                createdAt={new Date(comment.createdAt).toLocaleDateString(
                  'en-US',
                  { dateStyle: 'medium' }
                )}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

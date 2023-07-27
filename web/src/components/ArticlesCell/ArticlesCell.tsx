import type { ArticlesQuery } from 'types/graphql'

import { routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useAuth } from '../../auth'
import { truncate } from '../../lib/formatters'

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
      id
      public
      title
      body
      createdAt
      User {
        name
      }
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
  <section className="flex h-full items-center p-10 dark:text-gray-100">
    <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
      <div className="max-w-md text-center">
        <span className="sr-only">Error</span>
        <img
          src="embarrassed_empty.svg"
          alt=""
          className="mx-auto h-52 md:h-64"
        />
        <p className="text-2xl font-semibold md:text-3xl">
          Sorry, there are no articles yet.
        </p>
        <p className="mb-8 mt-4 dark:text-gray-400">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <a
          rel="noopener noreferrer"
          href={routes.home()}
          className="rounded px-8 py-3 font-semibold dark:bg-violet-400 dark:text-gray-900"
        >
          Back to homepage
        </a>
      </div>
    </div>
  </section>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  const { isAuthenticated } = useAuth()

  return (
    <ul>
      {articles.map((item) => {
        return (
          <div
            key={item.id}
            className="my-4 dark:bg-gray-800 dark:text-gray-100"
          >
            <div className="container mx-auto max-w-4xl rounded-lg px-10 py-6 shadow-sm dark:bg-gray-900">
              <div className="flex flex-col items-start justify-between space-y-2">
                {!item.public && (
                  <span className="rounded px-2 py-1 font-bold dark:bg-violet-400 dark:text-gray-900">
                    Premium
                  </span>
                )}
                <p className="text-sm dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                  })}
                </p>
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 dark:text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="self-center text-sm">{item.User.name}</span>
                </div>
              </div>
              <div className="mt-3">
                <a
                  rel="noopener noreferrer"
                  href={
                    !item?.public && !isAuthenticated
                      ? routes.passwordlessAuth()
                      : routes.article({ id: item.id })
                  }
                  className="text-2xl font-bold hover:underline"
                >
                  {item.title}
                </a>
                <p className="mt-2">{truncate(item.body)}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <a
                  rel="noopener noreferrer"
                  href={
                    !item?.public && !isAuthenticated
                      ? routes.passwordlessAuth()
                      : routes.article({ id: item.id })
                  }
                  className="hover:underline dark:text-violet-400"
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </ul>
  )
}

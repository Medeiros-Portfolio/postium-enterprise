import { useState } from 'react'

import { Link, navigate, routes } from '@redwoodjs/router'

import { useAuth } from '../../auth'
import { thumbnail } from '../../lib/thumbnail'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { currentUser, isAuthenticated, logOut, hasRole } = useAuth()
  const [showLateralMenu, setShowLateralMenu] = useState(false)
  const toggleLateralMenu = () => setShowLateralMenu(!showLateralMenu)

  return (
    <>
      <header className="border-b-2 border-b-violet-400 p-4 dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto flex h-16 justify-between">
          <div className="flex">
            <a
              rel="noopener noreferrer"
              href={routes.home()}
              aria-label="Back to homepage"
              className="flex items-center"
            >
              <img src="goat_logo.svg" alt="" className="w-10" />
            </a>
            <ul className="hidden items-stretch space-x-3 px-3 font-sans text-lg font-semibold lg:flex">
              <li className="flex">
                <Link
                  to={routes.home()}
                  className="-mb-1 flex items-center border-b-2 px-4 hover:text-violet-400 dark:border-transparent"
                >
                  Home
                </Link>
              </li>
              {isAuthenticated && hasRole(['admin', 'writer']) ? (
                <li className="flex">
                  <Link
                    to={routes.posts()}
                    className="-mb-1 flex items-center border-b-2 px-4 hover:text-violet-400 dark:border-transparent"
                  >
                    Publish
                  </Link>
                </li>
              ) : null}
              <li className="flex">
                <Link
                  to={routes.articles()}
                  className="-mb-1 flex items-center border-b-2 px-4 hover:text-violet-400 dark:border-transparent"
                >
                  Articles
                </Link>
              </li>
              <li className="flex">
                <Link
                  to={routes.contact()}
                  className="-mb-1 flex items-center border-b-2 px-4 hover:text-violet-400 dark:border-transparent"
                >
                  Contact
                </Link>
              </li>
              <li className="flex">
                <Link
                  to={routes.about()}
                  className="-mb-1 flex items-center border-b-2 px-4 hover:text-violet-400 dark:border-transparent"
                >
                  About
                </Link>
              </li>
              {isAuthenticated && hasRole('admin') ? (
                <li className="flex">
                  <Link
                    to={routes.users()}
                    className="-mb-1 flex items-center border-b-2 px-4 text-violet-500 hover:text-violet-300 dark:border-transparent"
                  >
                    Users
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="hidden flex-shrink-0 items-center space-x-3 lg:flex">
            {isAuthenticated ? (
              <>
                <span className="mr-6 flex items-center space-x-1">
                  <a href={routes.profile()}>
                    <img
                      src={thumbnail(currentUser?.avatar)}
                      alt=""
                      className="h-12 w-12 rounded-full border-2 border-violet-300 hover:scale-105 dark:bg-gray-500"
                    />
                  </a>
                  <a href={routes.profile()}>
                    <span className="border-b-2 border-t-2 border-violet-500 px-2 text-lg font-medium hover:border-violet-200 dark:text-gray-400">
                      {currentUser?.name.split(' ')[0]}
                    </span>
                  </a>
                </span>
                <button
                  onClick={() => logOut()}
                  className="rounded px-8 py-3 font-semibold hover:text-gray-400 dark:bg-violet-800 dark:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate(routes.passwordlessAuth())}
                className="rounded px-8 py-3 font-semibold dark:bg-violet-400 dark:text-gray-900"
              >
                Log in
              </button>
            )}
          </div>
          <button onClick={toggleLateralMenu} className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
      <main className="flex justify-center dark:bg-gray-800 dark:text-gray-100">
        <div className="py-10">{children}</div>

        {showLateralMenu ? (
          <div className="mr-0 h-auto w-60 border-l-2 border-l-violet-400 p-3 dark:bg-gray-800 dark:text-gray-100">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 p-2">
                <img
                  src={thumbnail(currentUser?.avatar)}
                  alt=""
                  className="h-12 w-12 rounded-full border-2 border-violet-300 dark:bg-gray-500"
                />
                <div>
                  <h2 className="border-t- border-b-2 border-t-2 border-violet-500 px-2 text-lg font-medium  dark:text-gray-400">
                    {currentUser?.name.split(' ')[0]}
                  </h2>
                  <span className="flex items-center space-x-1">
                    <a
                      rel="noopener noreferrer"
                      href={routes.profile()}
                      className="text-xs hover:underline dark:text-gray-400"
                    >
                      View profile
                    </a>
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate(routes.passwordlessAuth())}
                className="rounded px-8 py-3 font-semibold dark:bg-violet-400 dark:text-gray-900"
              >
                Log in
              </button>
            )}

            <div className="divide-y divide-gray-700">
              <ul className="space-y-1 pb-4 pt-2 text-sm">
                <li className="dark:bg-gray-800 dark:text-gray-50">
                  <a
                    rel="noopener noreferrer"
                    href={routes.home()}
                    className="flex items-center space-x-3 rounded-md p-2"
                  >
                    <img src="home-2.svg" alt="" className="w-6" />
                    <span>Home</span>
                  </a>
                </li>
                {isAuthenticated && hasRole(['admin', 'writer']) ? (
                  <li className="dark:bg-gray-800 dark:text-gray-50">
                    <a
                      rel="noopener noreferrer"
                      href={routes.posts()}
                      className="flex items-center space-x-3 rounded-md p-2"
                    >
                      <img src="publish.svg" alt="" className="w-6" />
                      <span>Publish</span>
                    </a>
                  </li>
                ) : null}
                <li>
                  <a
                    rel="noopener noreferrer"
                    href={routes.articles()}
                    className="flex items-center space-x-3 rounded-md p-2"
                  >
                    <img src="articles.svg" alt="" className="w-6" />
                    <span>Articles</span>
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href={routes.contact()}
                    className="flex items-center space-x-3 rounded-md p-2"
                  >
                    <img src="contact.svg" alt="" className="w-6" />
                    <span>Contact</span>
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href={routes.about()}
                    className="flex items-center space-x-3 rounded-md p-2"
                  >
                    <img src="about.svg" alt="" className="w-6" />
                    <span>About</span>
                  </a>
                </li>
              </ul>

              {isAuthenticated ? (
                <>
                  <ul className="space-y-1 pb-2 pt-4 text-sm">
                    <li>
                      <button
                        onClick={() => logOut()}
                        className="rounded px-8 py-3 font-semibold dark:bg-violet-800 dark:text-gray-900"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </main>
    </>
  )
}

export default MainLayout

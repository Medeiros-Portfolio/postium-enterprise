import { useState } from 'react'

import { Link, navigate, routes } from '@redwoodjs/router'

import { useAuth } from '../../auth'

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
              <svg
                className="h-20 w-20 dark:text-violet-400"
                viewBox="0 0 800 800"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M791.55 546.6S734 451.32 647.18 369.87c-43.42-40.73-94.39-78.54-151.34-99-28.48-10.22-58.79-15.8-89.67-14.76a212.58 212.58 0 0 0-93 24.9c-6.36 3.36-14.76 16-14.23 25.22s3.82 12.59 5.53 14.82c3.41 4.47 4.83 5 6.16 6a58.43 58.43 0 0 0 6.69 4.25c4.51 2.58 10.16 5.52 17 9 13.76 6.92 32.07 15.71 50.53 24.42 20.84 9.84 27.63 12.88 42 19.48l-118.28 135a26.59 26.59 0 1 0 40 35l141.67-161.63a26.61 26.61 0 0 0-8.95-41.71s-37.18-17-73.69-34.22c-4.53-2.14-7.8-3.8-12.23-5.91 27.55-3.22 54.86.32 82.49 10.24 46.59 16.73 92.79 50.08 132.92 87.71C683.5 476.88 729.89 549.43 739 564l-17.93 47.28a485.84 485.84 0 0 1-81.44-10.11c-25.46-5.36-51.17-13.44-70.36-24.11s-30.66-22.79-34.75-36.47a26.6 26.6 0 1 0-51 15.26c7.05 23.58 22.45 41.7 40.94 55.51-4.1 9.44-9.08 21.29-14.07 34.15-11.87 30.63-24.76 64.86-24.72 96a26.6 26.6 0 1 0 53.2-.06c0-12.26 10-48.09 21.13-76.68 4-10.32 8-20 11.48-28.07 18.71 7.33 38.26 12.59 57.18 16.57C686.09 665.26 739 665.3 739 665.3a26.61 26.61 0 0 0 25-17.17l29.69-78.3a26.61 26.61 0 0 0-2.14-23.23z"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="10"
                />
              </svg>
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
                    to={routes.posts()}
                    className="-mb-1 flex items-center border-b-2 px-4 hover:text-violet-400 dark:border-transparent"
                  >
                    Publish
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="hidden flex-shrink-0 items-center space-x-3 lg:flex">
            {isAuthenticated ? (
              <>
                <span className="flex items-center space-x-1">
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 dark:text-violet-400"
                  >
                    <path
                      d="M20,21V19a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="dark:text-gray-400">
                    {currentUser?.name.split(' ')[0]}
                  </span>
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
                onClick={() => navigate(routes.login())}
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
                  src="https://source.unsplash.com/100x100/?portrait"
                  alt=""
                  className="h-12 w-12 rounded-full dark:bg-gray-500"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {currentUser?.name.split(' ')[0]}
                  </h2>
                  <span className="flex items-center space-x-1">
                    <a
                      rel="noopener noreferrer"
                      // TODO: add user profile route
                      href={routes.home()}
                      className="text-xs hover:underline dark:text-gray-400"
                    >
                      View profile
                    </a>
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate(routes.login())}
                className="rounded px-8 py-3 font-semibold dark:bg-violet-400 dark:text-gray-900"
              >
                Log in
              </button>
            )}

            <div className="divide-y divide-gray-700">
              <ul className="space-y-1 pb-4 pt-2 text-sm">
                {isAuthenticated && hasRole('admin') ? (
                  <li className="dark:bg-gray-800 dark:text-gray-50">
                    <a
                      rel="noopener noreferrer"
                      href={routes.posts()}
                      className="flex items-center space-x-3 rounded-md p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="h-5 w-5 fill-current dark:text-gray-400"
                      >
                        <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                      </svg>
                      <span>Publish</span>
                    </a>
                  </li>
                ) : null}
                <li className="dark:bg-gray-800 dark:text-gray-50">
                  <a
                    rel="noopener noreferrer"
                    href={routes.home()}
                    className="flex items-center space-x-3 rounded-md p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-5 w-5 fill-current dark:text-gray-400"
                    >
                      <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                    </svg>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href={routes.articles()}
                    className="flex items-center space-x-3 rounded-md p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-5 w-5 fill-current dark:text-gray-400"
                    >
                      <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                    </svg>
                    <span>Articles</span>
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href={routes.contact()}
                    className="flex items-center space-x-3 rounded-md p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-5 w-5 fill-current dark:text-gray-400"
                    >
                      <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
                      <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
                    </svg>
                    <span>Contact</span>
                  </a>
                </li>
                <li>
                  <a
                    rel="noopener noreferrer"
                    href={routes.about()}
                    className="flex items-center space-x-3 rounded-md p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="h-5 w-5 fill-current dark:text-gray-400"
                    >
                      <path d="M203.247,386.414,208,381.185V355.4L130.125,191H93.875L16,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42A124.343,124.343,0,0,0,203.247,386.414ZM176,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,48,369.667V362.6l64-135.112L176,362.6Z"></path>
                      <path d="M418.125,191h-36.25L304,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42a124.343,124.343,0,0,0,91.369-40.607L496,381.185V355.4ZM464,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,336,369.667V362.6l64-135.112L464,362.6Z"></path>
                      <path d="M272,196.659A56.223,56.223,0,0,0,309.659,159H416V127H309.659a55.991,55.991,0,0,0-107.318,0H96v32H202.341A56.223,56.223,0,0,0,240,196.659V463H136v32H376V463H272ZM232,143a24,24,0,1,1,24,24A24,24,0,0,1,232,143Z"></path>
                    </svg>
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

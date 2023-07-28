import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:px-10 md:py-32 lg:px-32 xl:max-w-3xl">
          <h1 className="leadi text-4xl font-bold sm:text-5xl">
            Quisquam necessita vel
            <span className="dark:text-violet-400">laborum doloribus</span>
            delectus
          </h1>
          <p className="mb-12 mt-8 px-8 text-lg">
            Cupiditate minima voluptate temporibus quia? Architecto beatae esse
            ab amet vero eaque explicabo!
          </p>
          <div className="flex flex-wrap justify-center">
            <button
              onClick={() => navigate(routes.articles())}
              className="m-2 rounded px-8 py-3 text-lg font-semibold dark:bg-violet-400 dark:text-gray-900"
            >
              Get started
            </button>
            <button
              onClick={() => navigate(routes.about())}
              className="m-2 rounded border px-8 py-3 text-lg dark:border-gray-700 dark:text-gray-50"
            >
              Learn more
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage

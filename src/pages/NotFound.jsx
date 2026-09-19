import { Link } from 'react-router-dom'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="That page does not exist." path="/404" />

      <div className="mx-auto grid min-h-[70vh] max-w-content place-items-center px-5 py-24 text-center">
        <div>
          <p className="gradient-text text-7xl font-bold">404</p>
          <h1 className="mt-4 text-2xl font-bold text-fg">That page doesn&apos;t exist</h1>
          <p className="mx-auto mt-3 max-w-sm text-muted">
            The link may be outdated, or the page may have moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="gradient-bg inline-flex h-11 items-center rounded-full px-6 font-medium text-white">
              Back to home
            </Link>
            <Link
              to="/#projects"
              className="inline-flex h-11 items-center rounded-full border border-line bg-surface px-6 font-medium text-fg"
            >
              See projects
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

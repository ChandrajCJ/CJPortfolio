import { Navigate, useLocation } from 'react-router-dom'

/**
 * A redirect that keeps the query string, so tracking tags on a shared link
 * (`?ref=acme`, `?utm_source=...`) survive the hop from `/` to `/home`.
 * `to` may carry a hash: the query goes in before it.
 */
export default function KeepQueryNavigate({ to }) {
  const { search } = useLocation()
  const [path, hash] = to.split('#')
  return <Navigate to={`${path}${search}${hash ? `#${hash}` : ''}`} replace />
}

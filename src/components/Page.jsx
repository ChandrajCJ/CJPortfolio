/** Shared page frame: clears the fixed header and applies the max width. */
export default function Page({ children, className = '' }) {
  return (
    <div className={`mx-auto max-w-content px-5 pb-24 pt-28 md:px-8 md:pt-36 ${className}`}>{children}</div>
  )
}

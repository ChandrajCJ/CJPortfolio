/**
 * Sends a custom event to Umami (components/Analytics.jsx). A no-op until the
 * tracker has loaded, and always in development or when analytics is off,
 * so callers never need to check.
 *
 * Keep event data to ids and labels: never message text, names or emails.
 */
export function track(name, data) {
  try {
    window.umami?.track(name, data)
  } catch {
    // Analytics must never break the page.
  }
}

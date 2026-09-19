import { Component } from 'react'

/**
 * Without this, one failed lazy chunk or a bad animation payload white-screens
 * the whole portfolio.
 */
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error('Unhandled UI error:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="grid min-h-screen place-items-center bg-bg px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold text-fg">Something broke on this page.</h1>
          <p className="mt-3 text-muted">
            That is on me, not you. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={() => window.location.assign('/')}
            className="gradient-bg mt-6 rounded-full px-6 py-2.5 font-medium text-white"
          >
            Back to home
          </button>
        </div>
      </div>
    )
  }
}

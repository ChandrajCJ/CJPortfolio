import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from '../context/themeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg transition-colors hover:bg-elevated ${className}`}
    >
      {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  )
}

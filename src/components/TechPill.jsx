export default function TechPill({ children, active = false, as: Tag = 'span', ...rest }) {
  return (
    <Tag
      {...rest}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? 'border-transparent btn-accent'
          : 'border-line bg-elevated text-muted hover:border-accent/50 hover:text-fg'
      }`}
    >
      {children}
    </Tag>
  )
}

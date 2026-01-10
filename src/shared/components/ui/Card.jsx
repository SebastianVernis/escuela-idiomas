export function Card({ children, padding = 'md', hover = false, ...props }) {
  const paddingMap = {
    sm: 'var(--spacing-md)',
    md: 'var(--spacing-lg)',
    lg: 'var(--spacing-xl)',
  }

  const style = {
    backgroundColor: 'white',
    borderRadius: 'var(--radius-lg)',
    padding: paddingMap[padding],
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--color-border)',
    transition: 'all var(--transition-fast)',
    ...(hover && {
      cursor: 'pointer',
    }),
  }

  const hoverStyle = hover
    ? {
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'var(--shadow-md)'
        },
      }
    : {}

  return (
    <div style={style} {...hoverStyle} {...props}>
      {children}
    </div>
  )
}

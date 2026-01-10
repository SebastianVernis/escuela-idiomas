import { Link } from 'react-router-dom'

const variants = {
  primary: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--color-primary)',
    border: '2px solid var(--color-primary)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text)',
    border: 'none',
  },
}

const sizes = {
  sm: {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    fontSize: '0.875rem',
  },
  md: {
    padding: 'var(--spacing-md) var(--spacing-lg)',
    fontSize: '1rem',
  },
  lg: {
    padding: 'var(--spacing-lg) var(--spacing-xl)',
    fontSize: '1.125rem',
  },
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  ...props
}) {
  const style = {
    ...variants[variant],
    ...sizes[size],
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all var(--transition-fast)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    width: fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
  }

  if (to) {
    return (
      <Link to={to} style={style} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} style={style} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={style} {...props}>
      {children}
    </button>
  )
}

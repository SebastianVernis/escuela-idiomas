export function Input({
  label,
  error,
  type = 'text',
  fullWidth = true,
  ...props
}) {
  const inputStyle = {
    width: fullWidth ? '100%' : 'auto',
    padding: 'var(--spacing-md)',
    fontSize: '1rem',
    border: `2px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
    borderRadius: 'var(--radius-md)',
    transition: 'border-color var(--transition-fast)',
    outline: 'none',
  }

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 500 }}>
          {label}
        </label>
      )}
      <input
        type={type}
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--color-primary)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? 'var(--color-error)' : 'var(--color-border)'
        }}
        {...props}
      />
      {error && (
        <span style={{ display: 'block', marginTop: 'var(--spacing-xs)', fontSize: '0.875rem', color: 'var(--color-error)' }}>
          {error}
        </span>
      )}
    </div>
  )
}

export function Loading({ size = 'md', text }) {
  const sizes = {
    sm: '24px',
    md: '48px',
    lg: '64px',
  }

  const spinnerStyle = {
    width: sizes[size],
    height: sizes[size],
    border: '4px solid var(--color-border)',
    borderTop: '4px solid var(--color-primary)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-md)' }}>
      <div style={spinnerStyle} />
      {text && <p style={{ color: 'var(--color-text-secondary)' }}>{text}</p>}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

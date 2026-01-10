import { useEffect } from 'react'

export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = {
    sm: '400px',
    md: '600px',
    lg: '800px',
    full: '90vw',
  }

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 'var(--spacing-lg)',
  }

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: 'var(--radius-lg)',
    width: '100%',
    maxWidth: sizes[size],
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: 'var(--shadow-xl)',
  }

  const headerStyle = {
    padding: 'var(--spacing-lg)',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  const contentStyle = {
    padding: 'var(--spacing-lg)',
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h3>{title}</h3>
          <button
            onClick={onClose}
            style={{
              fontSize: '1.5rem',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
            }}
          >
            ×
          </button>
        </div>
        <div style={contentStyle}>{children}</div>
      </div>
    </div>
  )
}

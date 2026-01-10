import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import { NAV_ITEMS } from '@/core/constants/navigation'
import { useScroll } from '@/core/hooks/useScroll'
import { useIsMobile } from '@/core/hooks/useMediaQuery'
import { Button } from './ui'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isScrolled = useScroll(20)
  const isMobile = useIsMobile()
  const location = useLocation()

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
    boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
    borderBottom: '1px solid var(--color-border)',
    transition: 'all var(--transition-normal)',
    backdropFilter: 'blur(10px)',
  }

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-md) var(--spacing-xl)',
    maxWidth: '1280px',
    margin: '0 auto',
  }

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--color-primary)',
    textDecoration: 'none',
  }

  const navStyle = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xl)',
  }

  const mobileMenuStyle = {
    position: 'fixed',
    top: '65px',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: 'var(--shadow-lg)',
    padding: 'var(--spacing-lg)',
    display: isMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
    borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
  }

  const linkStyle = (isActive) => ({
    color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
    fontWeight: isActive ? 600 : 500,
    textDecoration: 'none',
    transition: 'color var(--transition-fast)',
    padding: 'var(--spacing-sm) 0',
  })

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <Link to="/" style={logoStyle}>
            <Globe size={32} />
            <span>Idiomas Avanza</span>
          </Link>

          <nav style={navStyle}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={linkStyle(location.pathname === item.path)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: 'var(--color-text)' }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}

          {!isMobile && (
            <Button to="/portal" variant="primary" size="sm">
              Ingresar
            </Button>
          )}
        </div>

        {isMobile && (
          <div style={mobileMenuStyle}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={linkStyle(location.pathname === item.path)}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button to="/portal" variant="primary" fullWidth>
              Ingresar
            </Button>
          </div>
        )}
      </header>
      <div style={{ height: '65px' }} />
    </>
  )
}

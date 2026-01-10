import { Link, useLocation } from 'react-router-dom'
import { Globe, LogOut } from 'lucide-react'
import { ADMIN_NAV_ITEMS } from '@/core/constants/navigation'

export function AdminHeader() {
  const location = useLocation()

  const headerStyle = {
    backgroundColor: 'white',
    borderBottom: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-sm)',
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
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--color-primary)',
    textDecoration: 'none',
  }

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xl)',
  }

  const linkStyle = (isActive) => ({
    color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
    fontWeight: isActive ? 600 : 500,
    textDecoration: 'none',
    transition: 'color var(--transition-fast)',
    fontSize: '0.875rem',
  })

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <Link to="/admin" style={logoStyle}>
          <Globe size={28} />
          <span>Admin Panel</span>
        </Link>

        <nav style={navStyle}>
          {ADMIN_NAV_ITEMS.slice(0, 3).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={linkStyle(location.pathname === item.path)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => console.log('Logout')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            color: 'var(--color-text-secondary)',
            fontSize: '0.875rem',
            cursor: 'pointer',
          }}
        >
          <LogOut size={18} />
          Salir
        </button>
      </div>
    </header>
  )
}

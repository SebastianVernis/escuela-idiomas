import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Handle responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
      // Close mobile menu when switching to desktop
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/cursos', label: 'Cursos' },
    { path: '/biblioteca', label: 'Biblioteca' },
    { path: '/certificaciones', label: 'Certificaciones' },
  ]

  return (
    <header 
      className="header-main"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isScrolled ? 'var(--gray-300)' : 'var(--gray-200)'}`,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? 'var(--shadow-lg)' : 'none'
      }}
    >
      <div className="container">
        <div 
          className="header-content"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '4rem'
          }}
        >
          {/* Logo */}
          <Link 
            to="/" 
            className="logo-link"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <div 
              className="logo-icon"
              style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, var(--primary-600), var(--primary-800))',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1) rotate(3deg)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)'
              }}
            >
              <Globe color="white" size={24} />
            </div>
            <div 
              className="logo-text"
              style={{
                display: !isMobile ? 'block' : 'none'
              }}
            >
              <div 
                style={{
                  fontWeight: 'var(--font-weight-bold)',
                  fontSize: '1.25rem',
                  color: 'var(--gray-900)',
                  transition: 'color 0.3s ease'
                }}
              >
                Idiomas Avanza
              </div>
              <div 
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--gray-500)',
                  marginTop: '-0.25rem'
                }}
              >
                Tu futuro multilingüe
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="desktop-nav"
            role="navigation"
            aria-label="Navegación principal"
            style={{
              display: !isMobile ? 'flex' : 'none',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}
          >
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link"
                style={{
                  position: 'relative',
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-xl)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: '0.875rem',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  background: isActive(item.path) 
                    ? 'linear-gradient(to right, var(--primary-50), var(--primary-100))' 
                    : 'transparent',
                  color: isActive(item.path) 
                    ? 'var(--primary-700)' 
                    : 'var(--gray-600)',
                  boxShadow: isActive(item.path) ? 'var(--shadow-sm)' : 'none',
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.target.style.color = 'var(--gray-900)'
                    e.target.style.background = 'var(--gray-50)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.target.style.color = 'var(--gray-600)'
                    e.target.style.background = 'transparent'
                  }
                }}
                onFocus={(e) => {
                  e.target.style.outline = '2px solid var(--primary-500)'
                  e.target.style.outlineOffset = '2px'
                }}
                onBlur={(e) => {
                  e.target.style.outline = 'none'
                }}
              >
                {item.label}
                {isActive(item.path) && (
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '0.25rem',
                      height: '0.25rem',
                      background: 'var(--primary-600)',
                      borderRadius: '50%'
                    }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div 
            className="desktop-cta"
            style={{
              display: !isMobile ? 'flex' : 'none',
              alignItems: 'center',
              gap: 'var(--space-3)'
            }}
          >
            <Link 
              to="/portal" 
              className="btn btn-ghost"
              style={{
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
              }}
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/portal" 
              className="btn btn-primary"
              style={{
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)'
                e.target.style.boxShadow = 'var(--shadow-lg)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = 'var(--shadow-sm)'
              }}
            >
              Comenzar Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="mobile-menu-btn"
            style={{
              display: isMobile ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--space-2)',
              borderRadius: 'var(--radius-xl)',
              border: 'none',
              background: isMenuOpen ? 'var(--primary-50)' : 'transparent',
              color: isMenuOpen ? 'var(--primary-600)' : 'var(--gray-600)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
            onMouseEnter={(e) => {
              if (!isMenuOpen) {
                e.target.style.background = 'var(--gray-100)'
                e.target.style.color = 'var(--gray-900)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isMenuOpen) {
                e.target.style.background = 'transparent'
                e.target.style.color = 'var(--gray-600)'
              }
            }}
            onFocus={(e) => {
              e.target.style.outline = '2px solid var(--primary-500)'
              e.target.style.outlineOffset = '2px'
            }}
            onBlur={(e) => {
              e.target.style.outline = 'none'
            }}
            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-navigation"
          className="mobile-menu"
          role="navigation"
          aria-label="Menú de navegación móvil"
          style={{
            display: isMobile ? 'block' : 'none',
            overflow: 'hidden',
            transition: 'all 0.3s ease-out',
            maxHeight: isMenuOpen ? '24rem' : '0',
            opacity: isMenuOpen ? 1 : 0,
            borderTop: isMenuOpen ? '1px solid var(--gray-200)' : 'none'
          }}
        >
          <div style={{ padding: 'var(--space-4) 0' }}>
            <nav 
              role="navigation" 
              aria-label="Enlaces de navegación principal"
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}
            >
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-xl)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    background: isActive(item.path) 
                      ? 'linear-gradient(to right, var(--primary-50), var(--primary-100))' 
                      : 'transparent',
                    color: isActive(item.path) 
                      ? 'var(--primary-700)' 
                      : 'var(--gray-600)',
                    transform: isActive(item.path) ? 'translateX(0.5rem)' : 'translateX(0)',
                    animationDelay: `${index * 50}ms`
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.color = 'var(--gray-900)'
                      e.target.style.background = 'var(--gray-50)'
                      e.target.style.transform = 'translateX(0.25rem)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.color = 'var(--gray-600)'
                      e.target.style.background = 'transparent'
                      e.target.style.transform = 'translateX(0)'
                    }
                  }}
                  onFocus={(e) => {
                    e.target.style.outline = '2px solid var(--primary-500)'
                    e.target.style.outlineOffset = '2px'
                  }}
                  onBlur={(e) => {
                    e.target.style.outline = 'none'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div 
                style={{
                  borderTop: '1px solid var(--gray-200)',
                  marginTop: 'var(--space-4)',
                  paddingTop: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)'
                }}
              >
                <Link 
                  to="/portal" 
                  className="btn btn-ghost"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/portal" 
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)'
                    e.target.style.boxShadow = 'var(--shadow-lg)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.boxShadow = 'var(--shadow-sm)'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Comenzar Gratis
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
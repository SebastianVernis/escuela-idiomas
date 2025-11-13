import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Globe className="text-white" size={24} />
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900">Idiomas Avanza</div>
              <div className="text-xs text-gray-500 -mt-1">Tu futuro multilingüe</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/portal" className="btn btn-ghost">
              Iniciar Sesión
            </Link>
            <Link to="/portal" className="btn btn-primary">
              Comenzar Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 animate-fadeIn">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-md font-medium text-sm transition-all ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <Link 
                  to="/portal" 
                  className="block text-center btn btn-ghost w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/portal" 
                  className="block text-center btn btn-primary w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Comenzar Gratis
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
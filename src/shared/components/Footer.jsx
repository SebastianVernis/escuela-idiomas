import { Link } from 'react-router-dom'
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const footerStyle = {
    backgroundColor: 'var(--color-text)',
    color: 'white',
    padding: 'var(--spacing-3xl) 0 var(--spacing-xl)',
  }

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 var(--spacing-xl)',
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--spacing-2xl)',
    marginBottom: 'var(--spacing-2xl)',
  }

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-md)',
  }

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    transition: 'color var(--transition-fast)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  }

  const socialStyle = {
    display: 'flex',
    gap: 'var(--spacing-md)',
    marginTop: 'var(--spacing-md)',
  }

  const iconButtonStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--transition-fast)',
    cursor: 'pointer',
  }

  const bottomStyle = {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: 'var(--spacing-lg)',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
  }

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          <div style={sectionStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
              <Globe size={32} />
              <h3>Idiomas Avanza</h3>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
              Tu academia de idiomas de confianza. Aprende inglés, francés, italiano, alemán y portugués con profesores nativos.
            </p>
            <div style={socialStyle}>
              <a href="#" style={iconButtonStyle}><Facebook size={20} /></a>
              <a href="#" style={iconButtonStyle}><Instagram size={20} /></a>
              <a href="#" style={iconButtonStyle}><Youtube size={20} /></a>
            </div>
          </div>

          <div style={sectionStyle}>
            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Enlaces Rápidos</h4>
            <Link to="/cursos" style={linkStyle}>Nuestros Cursos</Link>
            <Link to="/biblioteca" style={linkStyle}>Biblioteca Digital</Link>
            <Link to="/certificaciones" style={linkStyle}>Certificaciones</Link>
            <Link to="/portal" style={linkStyle}>Portal Estudiantes</Link>
          </div>

          <div style={sectionStyle}>
            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Contacto</h4>
            <a href="mailto:info@idiomasavanza.com" style={linkStyle}>
              <Mail size={18} />
              info@idiomasavanza.com
            </a>
            <a href="tel:+5491123456789" style={linkStyle}>
              <Phone size={18} />
              +54 9 11 2345-6789
            </a>
            <span style={linkStyle}>
              <MapPin size={18} />
              Buenos Aires, Argentina
            </span>
          </div>

          <div style={sectionStyle}>
            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Horario de Atención</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Lunes a Viernes<br />
              9:00 - 21:00 hs
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Sábados<br />
              10:00 - 14:00 hs
            </p>
          </div>
        </div>

        <div style={bottomStyle}>
          <p>© {new Date().getFullYear()} Idiomas Avanza. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

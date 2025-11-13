import { Link } from 'react-router-dom'
import { Globe, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Cursos',
      links: [
        { label: 'Inglés', href: '/cursos' },
        { label: 'Francés', href: '/cursos' },
        { label: 'Italiano', href: '/cursos' },
        { label: 'Portugués', href: '/cursos' },
        { label: 'Alemán', href: '/cursos' },
        { label: 'Todos los idiomas', href: '/cursos' },
      ]
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Biblioteca Digital', href: '/biblioteca' },
        { label: 'Certificaciones', href: '/certificaciones' },
        { label: 'Blog', href: '#' },
        { label: 'Guías de Estudio', href: '/biblioteca' },
        { label: 'Niveles de Idioma', href: '/certificaciones' },
        { label: 'Ayuda', href: '#' },
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre Nosotros', href: '#' },
        { label: 'Nuestros Profesores', href: '#' },
        { label: 'Metodología', href: '#' },
        { label: 'Testimonios', href: '#' },
        { label: 'Carreras', href: '#' },
        { label: 'Contacto', href: '#' },
      ]
    },
    {
      title: 'Soporte',
      links: [
        { label: 'Centro de Ayuda', href: '#' },
        { label: 'Preguntas Frecuentes', href: '#' },
        { label: 'Soporte Técnico', href: '#' },
        { label: 'Estado del Servicio', href: '#' },
        { label: 'Política de Reembolso', href: '#' },
        { label: 'Reportar Problema', href: '#' },
      ]
    }
  ]

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Globe size={24} />
              </div>
              <div>
                <div className="font-bold text-lg">Idiomas Avanza</div>
                <div className="text-xs text-gray-400">Tu futuro multilingüe</div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Plataforma líder en educación de idiomas online. Aprende con profesores certificados 
              y obtén certificaciones reconocidas internacionalmente.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail size={16} className="text-gray-400" />
                <span>info@idiomasavanza.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone size={16} className="text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin size={16} className="text-gray-400" />
                <span>Disponible globalmente</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 bg-gray-800 rounded-md flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href} 
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="container py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Mantente actualizado</h3>
              <p className="text-gray-300 text-sm">
                Recibe consejos, recursos y ofertas especiales directamente en tu email
              </p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <div className="form-input-icon flex-1 lg:w-80">
                <Mail className="icon" size={16} />
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="form-input bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary-500"
                />
              </div>
              <button className="btn btn-primary whitespace-nowrap">
                Suscribirme
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-6">
              <span>&copy; {currentYear} Idiomas Avanza. Todos los derechos reservados.</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/privacidad.html" className="hover:text-white transition-colors">
                Privacidad
              </Link>
              <Link to="/terminos.html" className="hover:text-white transition-colors">
                Términos
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Cookies
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
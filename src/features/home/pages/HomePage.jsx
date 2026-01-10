import { BookOpen, Users, Award, Globe } from 'lucide-react'
import { Button, Card } from '@/shared/components/ui'
import { LANGUAGES } from '@/core/constants/courses'
import { useIsDesktop, useIsTablet } from '@/core/hooks/useMediaQuery'

export function HomePage() {
  const isDesktop = useIsDesktop()
  const isTablet = useIsTablet()

  const heroStyle = {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: 'var(--spacing-3xl) 0',
    textAlign: 'center',
    color: 'white',
    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
  }

  const sectionStyle = {
    padding: 'var(--spacing-3xl) var(--spacing-xl)',
    maxWidth: '1280px',
    margin: '0 auto',
  }

  const featuresGridStyle = {
    display: 'grid',
    gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
    gap: 'var(--spacing-xl)',
    marginTop: 'var(--spacing-2xl)',
  }

  const languagesGridStyle = {
    display: 'grid',
    gridTemplateColumns: isDesktop ? 'repeat(5, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
    gap: 'var(--spacing-xl)',
    marginTop: 'var(--spacing-2xl)',
  }

  const featureCardStyle = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
  }

  const iconWrapperStyle = {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const features = [
    { icon: Users, title: 'Profesores Nativos', description: 'Aprende con docentes certificados y nativos del idioma' },
    { icon: BookOpen, title: 'Material Completo', description: 'Accede a nuestra biblioteca digital con recursos ilimitados' },
    { icon: Award, title: 'Certificación', description: 'Obtén certificados internacionales reconocidos' },
    { icon: Globe, title: '5 Idiomas', description: 'Inglés, Francés, Italiano, Alemán y Portugués' },
  ]

  return (
    <>
      <section style={heroStyle}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--spacing-xl)' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)', fontWeight: 800 }}>
            Aprende Idiomas con Expertos
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-xl)', opacity: 0.95 }}>
            Clases online y presenciales con profesores nativos. Certificación internacional incluida.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button to="/cursos" size="lg" style={{ backgroundColor: 'white', color: 'var(--color-primary)' }}>
              Ver Cursos
            </Button>
            <Button to="/portal" variant="secondary" size="lg" style={{ borderColor: 'white', color: 'white' }}>
              Ingresar al Portal
            </Button>
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>¿Por qué elegirnos?</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
          La mejor experiencia de aprendizaje con tecnología de punta
        </p>
        <div style={featuresGridStyle}>
          {features.map((feature) => (
            <Card key={feature.title} padding="lg" hover>
              <div style={featureCardStyle}>
                <div style={iconWrapperStyle}>
                  <feature.icon size={32} />
                </div>
                <h3>{feature.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ ...sectionStyle, backgroundColor: 'var(--color-surface)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>Idiomas Disponibles</h2>
        <div style={languagesGridStyle}>
          {LANGUAGES.map((lang) => (
            <Card key={lang.id} padding="lg" hover>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>{lang.flag}</div>
                <h3 style={{ color: lang.color }}>{lang.name}</h3>
                <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-sm)' }}>
                  Desde nivel básico hasta avanzado
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ ...sectionStyle, textAlign: 'center' }}>
        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>¿Listo para comenzar?</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
          Únete a miles de estudiantes que ya están aprendiendo con nosotros
        </p>
        <Button to="/cursos" size="lg">
          Explorar Cursos
        </Button>
      </section>
    </>
  )
}

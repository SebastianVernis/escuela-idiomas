import { Card } from '@/shared/components/ui'
import { BookOpen, Video, Headphones, FileText } from 'lucide-react'
import { useIsDesktop, useIsTablet } from '@/core/hooks/useMediaQuery'

export function LibraryPage() {
  const isDesktop = useIsDesktop()
  const isTablet = useIsTablet()

  const resources = [
    { icon: BookOpen, title: 'Libros Digitales', count: '500+', color: '#2563eb' },
    { icon: Video, title: 'Video Lecciones', count: '300+', color: '#10b981' },
    { icon: Headphones, title: 'Audio Podcasts', count: '200+', color: '#f59e0b' },
    { icon: FileText, title: 'Ejercicios', count: '1000+', color: '#8b5cf6' },
  ]

  const sectionStyle = {
    padding: 'var(--spacing-3xl) var(--spacing-xl)',
    maxWidth: '1280px',
    margin: '0 auto',
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
    gap: 'var(--spacing-xl)',
    marginTop: 'var(--spacing-2xl)',
  }

  return (
    <>
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: 'var(--spacing-3xl) var(--spacing-xl)', textAlign: 'center' }}>
        <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Biblioteca Digital</h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.95 }}>
          Accede a miles de recursos educativos disponibles 24/7
        </p>
      </section>

      <section style={sectionStyle}>
        <div style={gridStyle}>
          {resources.map((resource) => (
            <Card key={resource.title} padding="lg" hover>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: `${resource.color}20`,
                  color: resource.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--spacing-lg)',
                }}>
                  <resource.icon size={40} />
                </div>
                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{resource.title}</h3>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: resource.color }}>{resource.count}</p>
                <p style={{ color: 'var(--color-text-secondary)' }}>recursos disponibles</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ ...sectionStyle, backgroundColor: 'var(--color-surface)' }}>
        <Card padding="lg">
          <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Acceso Exclusivo para Estudiantes</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
            Inicia sesión en el portal de estudiantes para acceder a toda nuestra biblioteca digital con contenido exclusivo y actualizado semanalmente.
          </p>
        </Card>
      </section>
    </>
  )
}

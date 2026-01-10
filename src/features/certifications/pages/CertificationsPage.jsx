import { Card } from '@/shared/components/ui'
import { Award, CheckCircle } from 'lucide-react'
import { useIsDesktop, useIsTablet } from '@/core/hooks/useMediaQuery'

export function CertificationsPage() {
  const isDesktop = useIsDesktop()
  const isTablet = useIsTablet()
  const certifications = [
    { name: 'Cambridge English', levels: ['A1-C2'], recognized: 'Mundial' },
    { name: 'DELF/DALF', levels: ['A1-C2'], recognized: 'Francia' },
    { name: 'CILS', levels: ['A1-C2'], recognized: 'Italia' },
    { name: 'Goethe-Zertifikat', levels: ['A1-C2'], recognized: 'Alemania' },
    { name: 'CELPE-Bras', levels: ['Intermedio-Avanzado'], recognized: 'Brasil' },
  ]

  const benefits = [
    'Reconocimiento internacional',
    'Válido para estudios superiores',
    'Aceptado por empresas globales',
    'Sin fecha de vencimiento',
    'Preparación incluida en cursos',
  ]

  const sectionStyle = {
    padding: 'var(--spacing-3xl) var(--spacing-xl)',
    maxWidth: '1280px',
    margin: '0 auto',
  }

  return (
    <>
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: 'var(--spacing-3xl) var(--spacing-xl)', textAlign: 'center' }}>
        <Award size={64} style={{ margin: '0 auto var(--spacing-lg)' }} />
        <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Certificaciones Internacionales</h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.95 }}>
          Obtén certificados reconocidos mundialmente
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>Certificaciones Disponibles</h2>
        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
          {certifications.map((cert) => (
            <Card key={cert.name} padding="lg" hover>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                <div>
                  <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{cert.name}</h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Niveles: {cert.levels.join(', ')}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    backgroundColor: 'var(--color-success)',
                    color: 'white',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}>
                    Reconocido en {cert.recognized}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ ...sectionStyle, backgroundColor: 'var(--color-surface)' }}>
        <Card padding="lg">
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Beneficios de Certificarte</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)', 
            gap: 'var(--spacing-lg)' 
          }}>
            {benefits.map((benefit) => (
              <div key={benefit} style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'start' }}>
                <CheckCircle size={24} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </>
  )
}

import { Card, Button } from '@/shared/components/ui'
import { LANGUAGES, COURSE_LEVELS, PRICING_TIERS } from '@/core/constants/courses'
import { formatCurrency } from '@/core/utils/formatters'
import { Check } from 'lucide-react'
import { useIsDesktop, useIsTablet } from '@/core/hooks/useMediaQuery'

export function CoursesPage() {
  const isDesktop = useIsDesktop()
  const isTablet = useIsTablet()

  const sectionStyle = {
    padding: 'var(--spacing-3xl) var(--spacing-xl)',
    maxWidth: '1280px',
    margin: '0 auto',
  }

  const languagesGridStyle = {
    display: 'grid',
    gridTemplateColumns: isDesktop ? 'repeat(5, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(1, 1fr)',
    gap: 'var(--spacing-xl)',
    marginTop: 'var(--spacing-2xl)',
  }

  const pricingGridStyle = {
    display: 'grid',
    gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)',
    gap: 'var(--spacing-xl)',
    marginTop: 'var(--spacing-2xl)',
  }

  return (
    <>
      <section style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: 'var(--spacing-3xl) var(--spacing-xl)', textAlign: 'center' }}>
        <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Nuestros Cursos</h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.95 }}>
          Encuentra el curso perfecto para ti y comienza tu viaje de aprendizaje
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>Idiomas Disponibles</h2>
        <div style={languagesGridStyle}>
          {LANGUAGES.map((lang) => (
            <Card key={lang.id} padding="lg" hover>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)', textAlign: 'center' }}>{lang.flag}</div>
              <h3 style={{ color: lang.color, textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>{lang.name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                {COURSE_LEVELS.map((level) => (
                  <div key={level.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--spacing-sm) 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span>{level.name}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>{level.description}</span>
                  </div>
                ))}
              </div>
              <Button to="/portal" variant="primary" fullWidth style={{ marginTop: 'var(--spacing-lg)' }}>
                Inscribirse
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ ...sectionStyle, backgroundColor: 'var(--color-surface)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>Planes y Precios</h2>
        <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
          Elige el plan que mejor se adapte a tus necesidades
        </p>
        <div style={pricingGridStyle}>
          {PRICING_TIERS.map((tier) => (
            <Card 
              key={tier.id} 
              padding="lg" 
              hover
              style={{
                position: 'relative',
                border: tier.popular ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              }}
            >
              {tier.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  padding: 'var(--spacing-xs) var(--spacing-md)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}>
                  Más Popular
                </div>
              )}
              <h3 style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>{tier.name}</h3>
              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {formatCurrency(tier.price)}
                </span>
                <span style={{ color: 'var(--color-text-secondary)' }}>/{tier.duration}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                {tier.features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'start' }}>
                    <Check size={20} style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button to="/portal" variant={tier.popular ? 'primary' : 'secondary'} fullWidth>
                Elegir Plan
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

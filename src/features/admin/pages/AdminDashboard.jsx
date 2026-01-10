import { Card } from '@/shared/components/ui'
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react'
import { useIsDesktop, useIsTablet } from '@/core/hooks/useMediaQuery'

export function AdminDashboard() {
  const isDesktop = useIsDesktop()
  const isTablet = useIsTablet()

  const stats = [
    { icon: Users, label: 'Estudiantes Activos', value: '245', change: '+12%', color: '#2563eb' },
    { icon: BookOpen, label: 'Cursos en Progreso', value: '18', change: '+5%', color: '#10b981' },
    { icon: DollarSign, label: 'Ingresos del Mes', value: '$125,000', change: '+8%', color: '#f59e0b' },
    { icon: TrendingUp, label: 'Tasa de Retención', value: '94%', change: '+2%', color: '#8b5cf6' },
  ]

  const containerStyle = {
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
    <div style={containerStyle}>
      <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>Dashboard Administrativo</h1>
      
      <div style={gridStyle}>
        {stats.map((stat) => (
          <Card key={stat.label} padding="lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-sm)' }}>
                  {stat.label}
                </p>
                <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>{stat.value}</h2>
                <span style={{ color: '#10b981', fontSize: '0.875rem', fontWeight: 600 }}>
                  {stat.change} vs mes anterior
                </span>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: `${stat.color}20`,
                color: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <stat.icon size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card padding="lg" style={{ marginTop: 'var(--spacing-2xl)' }}>
        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Actividad Reciente</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Contenido del dashboard en desarrollo...
        </p>
      </Card>
    </div>
  )
}

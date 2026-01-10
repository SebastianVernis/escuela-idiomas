import { useState } from 'react'
import { Card, Input, Button } from '@/shared/components/ui'
import { LogIn } from 'lucide-react'

export function PortalPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:', formData)
  }

  const containerStyle = {
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-xl)',
    backgroundColor: 'var(--color-surface)',
  }

  return (
    <div style={containerStyle}>
      <Card padding="lg" style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <LogIn size={48} style={{ color: 'var(--color-primary)', margin: '0 auto var(--spacing-md)' }} />
          <h2>Portal de Estudiantes</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-sm)' }}>
            Ingresa para acceder a tus cursos y recursos
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Button type="submit" fullWidth size="lg">
            Ingresar
          </Button>

          <div style={{ textAlign: 'center' }}>
            <a href="#" style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>

        <div style={{
          marginTop: 'var(--spacing-xl)',
          paddingTop: 'var(--spacing-lg)',
          borderTop: '1px solid var(--color-border)',
          textAlign: 'center',
        }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            ¿No tienes cuenta?{' '}
            <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Contáctanos
            </a>
          </p>
        </div>
      </Card>
    </div>
  )
}

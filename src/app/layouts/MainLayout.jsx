import { Outlet } from 'react-router-dom'
import { Header } from '@/shared/components/Header'
import { Footer } from '@/shared/components/Footer'

export function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

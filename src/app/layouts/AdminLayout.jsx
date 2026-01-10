import { Outlet } from 'react-router-dom'
import { AdminHeader } from '@/features/admin/components/AdminHeader'

export function AdminLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminHeader />
      <main style={{ flex: 1, backgroundColor: 'var(--color-surface)' }}>
        <Outlet />
      </main>
    </div>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AdminLayout } from './layouts/AdminLayout'
import { HomePage } from '@/features/home/pages/HomePage'
import { CoursesPage } from '@/features/courses/pages/CoursesPage'
import { LibraryPage } from '@/features/library/pages/LibraryPage'
import { CertificationsPage } from '@/features/certifications/pages/CertificationsPage'
import { PortalPage } from '@/features/portal/pages/PortalPage'
import { AdminDashboard } from '@/features/admin/pages/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cursos" element={<CoursesPage />} />
          <Route path="/biblioteca" element={<LibraryPage />} />
          <Route path="/certificaciones" element={<CertificationsPage />} />
          <Route path="/portal" element={<PortalPage />} />
        </Route>
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

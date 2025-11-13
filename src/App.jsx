import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Library from './pages/Library'
import Certifications from './pages/Certifications'
import Portal from './pages/Portal'
import Admin from './pages/Admin'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Courses />} />
          <Route path="/biblioteca" element={<Library />} />
          <Route path="/certificaciones" element={<Certifications />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
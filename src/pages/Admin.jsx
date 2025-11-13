import { useState } from 'react'
import { 
  Users, 
  BookOpen, 
  Award, 
  DollarSign, 
  BarChart3, 
  Settings, 
  User, 
  Lock,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  Bell,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Plus
} from 'lucide-react'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple authentication - in real app this would be properly secured
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsAuthenticated(true)
    } else {
      alert('Credenciales incorrectas. Usa: admin / admin123')
    }
  }

  const stats = [
    { 
      id: 'students',
      title: 'Estudiantes Activos', 
      value: '2,847', 
      change: '+12%', 
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    { 
      id: 'courses',
      title: 'Cursos Activos', 
      value: '52', 
      change: '+3', 
      trend: 'up',
      icon: BookOpen,
      color: 'green'
    },
    { 
      id: 'certificates',
      title: 'Certificados Expedidos', 
      value: '1,289', 
      change: '+18%', 
      trend: 'up',
      icon: Award,
      color: 'yellow'
    },
    { 
      id: 'revenue',
      title: 'Ingresos del Mes', 
      value: '$47,580', 
      change: '-2%', 
      trend: 'down',
      icon: DollarSign,
      color: 'purple'
    }
  ]

  const recentStudents = [
    { id: 1, name: 'María González', email: 'maria@email.com', course: 'Inglés B2', progress: 78, status: 'active', joinDate: '2024-10-20', avatar: 'MG' },
    { id: 2, name: 'Carlos López', email: 'carlos@email.com', course: 'Francés A2', progress: 45, status: 'active', joinDate: '2024-10-18', avatar: 'CL' },
    { id: 3, name: 'Ana Rodríguez', email: 'ana@email.com', course: 'Italiano B1', progress: 92, status: 'completed', joinDate: '2024-10-15', avatar: 'AR' },
    { id: 4, name: 'Luis Martín', email: 'luis@email.com', course: 'Portugués A1', progress: 23, status: 'active', joinDate: '2024-10-12', avatar: 'LM' },
    { id: 5, name: 'Elena Silva', email: 'elena@email.com', course: 'Alemán B2', progress: 67, status: 'paused', joinDate: '2024-10-10', avatar: 'ES' }
  ]

  const courses = [
    { id: 1, name: 'Inglés para Negocios', students: 345, rating: 4.9, status: 'active', instructor: 'Sarah Johnson', revenue: '$12,450' },
    { id: 2, name: 'Francés Conversacional', students: 234, rating: 4.8, status: 'active', instructor: 'Marie Dubois', revenue: '$8,320' },
    { id: 3, name: 'Italiano Básico', students: 198, rating: 4.7, status: 'active', instructor: 'Giuseppe Rossi', revenue: '$6,940' },
    { id: 4, name: 'Portugués Brasileño', students: 156, rating: 4.6, status: 'active', instructor: 'Ana Silva', revenue: '$5,460' },
    { id: 5, name: 'Alemán Técnico', students: 89, rating: 4.9, status: 'draft', instructor: 'Klaus Weber', revenue: '$3,120' }
  ]

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800', 
      paused: 'bg-yellow-100 text-yellow-800',
      draft: 'bg-gray-100 text-gray-800'
    }
    return colors[status] || colors.active
  }

  const getStatusLabel = (status) => {
    const labels = {
      active: 'Activo',
      completed: 'Completado',
      paused: 'Pausado', 
      draft: 'Borrador'
    }
    return labels[status] || status
  }

  const LoginForm = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="card-body text-center">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="text-white" size={32} />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
            <p className="text-gray-600 mb-8">Acceso restringido para administradores</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="form-group">
                <label className="form-label">Usuario</label>
                <div className="form-input-icon">
                  <User className="icon" size={20} />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="admin"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div className="form-input-icon">
                  <Lock className="icon" size={20} />
                  <input
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full">
                Acceder al Panel
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
              <strong>Demo:</strong> admin / admin123
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const DashboardTab = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const colorClasses = {
            blue: 'bg-blue-50 border-blue-200 text-blue-600',
            green: 'bg-green-50 border-green-200 text-green-600',
            yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600',
            purple: 'bg-purple-50 border-purple-200 text-purple-600'
          }
          
          return (
            <div key={stat.id} className={`card border-2 ${colorClasses[stat.color]}`}>
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <stat.icon size={24} className={stat.color === 'blue' ? 'text-blue-600' : stat.color === 'green' ? 'text-green-600' : stat.color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Activity size={20} />
              Actividad Reciente
            </h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {[
                { type: 'enrollment', user: 'María González', action: 'se inscribió en', target: 'Inglés B2', time: '2 min' },
                { type: 'completion', user: 'Carlos López', action: 'completó', target: 'Lección 5: Gramática', time: '5 min' },
                { type: 'certificate', user: 'Ana Rodríguez', action: 'obtuvo certificado', target: 'Italiano B1', time: '12 min' },
                { type: 'payment', user: 'Luis Martín', action: 'realizó pago de', target: '$149 USD', time: '25 min' },
                { type: 'enrollment', user: 'Elena Silva', action: 'se inscribió en', target: 'Alemán A1', time: '1h' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <div className="flex-1 text-sm">
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    <span className="text-gray-600"> {activity.action} </span>
                    <span className="font-medium text-gray-900">{activity.target}</span>
                    <div className="text-xs text-gray-500 mt-1">hace {activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Courses */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 size={20} />
              Cursos Más Populares
            </h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {courses.slice(0, 5).map((course, index) => (
                <div key={course.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-500">{course.students} estudiantes</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary-600">{course.revenue}</div>
                    <div className="text-sm text-gray-500">★ {course.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const StudentsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Estudiantes</h2>
          <p className="text-gray-600">Administra y supervisa a todos los estudiantes</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Download size={16} />
            Exportar
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            Nuevo Estudiante
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card card-compact">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-input-icon flex-1">
              <Search className="icon" size={16} />
              <input type="text" placeholder="Buscar estudiantes..." className="form-input" />
            </div>
            <select className="form-input md:w-48">
              <option value="">Todos los cursos</option>
              <option value="english">Inglés</option>
              <option value="french">Francés</option>
              <option value="italian">Italiano</option>
            </select>
            <select className="form-input md:w-48">
              <option value="">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="completed">Completado</option>
              <option value="paused">Pausado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Estudiante</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Curso</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Progreso</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Fecha de Ingreso</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {student.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{student.course}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${getStatusColor(student.status)}`}>
                      {getStatusLabel(student.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(student.joinDate).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="btn btn-ghost btn-sm">
                        <Eye size={14} />
                      </button>
                      <button className="btn btn-ghost btn-sm">
                        <Edit size={14} />
                      </button>
                      <button className="btn btn-ghost btn-sm text-red-600 hover:text-red-700">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const CoursesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Cursos</h2>
          <p className="text-gray-600">Administra el contenido educativo</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Upload size={16} />
            Importar
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            Nuevo Curso
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="card hover:shadow-lg transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-sm text-gray-600">Por {course.instructor}</p>
                </div>
                <button className="btn btn-ghost btn-sm">
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-gray-500">Estudiantes</div>
                  <div className="font-bold text-gray-900">{course.students}</div>
                </div>
                <div>
                  <div className="text-gray-500">Rating</div>
                  <div className="font-bold text-gray-900">★ {course.rating}</div>
                </div>
                <div>
                  <div className="text-gray-500">Ingresos</div>
                  <div className="font-bold text-primary-600">{course.revenue}</div>
                </div>
                <div>
                  <div className="text-gray-500">Estado</div>
                  <span className={`badge ${getStatusColor(course.status)}`}>
                    {getStatusLabel(course.status)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-ghost btn-sm flex-1">
                  <Eye size={14} />
                  Ver
                </button>
                <button className="btn btn-primary btn-sm flex-1">
                  <Edit size={14} />
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'students', label: 'Estudiantes', icon: Users },
    { id: 'courses', label: 'Cursos', icon: BookOpen },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ]

  const AdminDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">Idiomas Avanza - Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="btn btn-ghost">
                <Bell size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <div className="font-medium text-gray-900">Administrador</div>
                  <div className="text-sm text-gray-500">admin@idiomasavanza.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <nav className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <main className="p-6">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'students' && <StudentsTab />}
        {activeTab === 'courses' && <CoursesTab />}
        {activeTab === 'settings' && (
          <div className="text-center py-16">
            <Settings size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">Configuración</h3>
            <p className="text-gray-400">Panel de configuración en desarrollo</p>
          </div>
        )}
      </main>
    </div>
  )

  return isAuthenticated ? <AdminDashboard /> : <LoginForm />
}

export default Admin
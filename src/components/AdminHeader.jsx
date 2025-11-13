import { Bell, User } from 'lucide-react'

const AdminHeader = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">Idiomas Avanza - Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="btn btn-ghost hover:scale-105 transition-transform relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </span>
              </button>
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
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

      {/* Navigation Tabs */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <nav className="flex gap-2 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 shadow-sm scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <tab.icon size={16} className={`transition-transform ${
                activeTab === tab.id ? 'scale-110' : ''
              }`} />
              {tab.label}
              {activeTab === tab.id && (
                <div className="w-1.5 h-1.5 bg-primary-600 rounded-full ml-1"></div>
              )}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}

export default AdminHeader
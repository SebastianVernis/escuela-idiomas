import { useState } from 'react'
import { 
  Search, 
  BookOpen, 
  Play, 
  Download, 
  Eye,
  Filter,
  FileText,
  Headphones,
  Video,
  Image,
  Star,
  Clock,
  Users
} from 'lucide-react'

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedLanguage, setSelectedLanguage] = useState('all')

  const categories = [
    { id: 'all', name: 'Todas las categorías' },
    { id: 'grammar', name: 'Gramática' },
    { id: 'vocabulary', name: 'Vocabulario' },
    { id: 'pronunciation', name: 'Pronunciación' },
    { id: 'conversation', name: 'Conversación' },
    { id: 'business', name: 'Negocios' },
    { id: 'culture', name: 'Cultura' },
    { id: 'exam-prep', name: 'Preparación Exámenes' },
    { id: 'kids', name: 'Para Niños' }
  ]

  const types = [
    { id: 'all', name: 'Todos los tipos' },
    { id: 'pdf', name: 'PDF', icon: FileText },
    { id: 'audio', name: 'Audio', icon: Headphones },
    { id: 'video', name: 'Video', icon: Video },
    { id: 'interactive', name: 'Interactivo', icon: Play }
  ]

  const languages = [
    { id: 'all', name: 'Todos los idiomas', flag: '🌐' },
    { id: 'english', name: 'Inglés', flag: '🇺🇸' },
    { id: 'french', name: 'Francés', flag: '🇫🇷' },
    { id: 'italian', name: 'Italiano', flag: '🇮🇹' },
    { id: 'portuguese', name: 'Portugués', flag: '🇧🇷' },
    { id: 'german', name: 'Alemán', flag: '🇩🇪' }
  ]

  const resources = [
    {
      id: 1,
      title: "Complete English Grammar Guide",
      category: "grammar",
      language: "english",
      type: "pdf",
      size: "4.2 MB",
      pages: 156,
      downloads: 12450,
      rating: 4.9,
      duration: null,
      description: "Guía completa de gramática inglesa con ejercicios prácticos y ejemplos reales",
      level: "Todos los niveles",
      featured: true,
      premium: false,
      thumbnail: "📚"
    },
    {
      id: 2,
      title: "French Pronunciation Masterclass",
      category: "pronunciation",
      language: "french",
      type: "audio",
      size: "89 MB",
      pages: null,
      downloads: 8930,
      rating: 4.8,
      duration: "2h 15m",
      description: "Masterclass completa de pronunciación francesa con ejercicios de fonética",
      level: "Intermedio",
      featured: true,
      premium: true,
      thumbnail: "🎧"
    },
    {
      id: 3,
      title: "Business Italian Conversations",
      category: "business",
      language: "italian",
      type: "video",
      size: "234 MB",
      pages: null,
      downloads: 5670,
      rating: 4.7,
      duration: "1h 45m",
      description: "Videos de conversaciones empresariales en italiano con subtítulos",
      level: "Avanzado",
      featured: false,
      premium: true,
      thumbnail: "🎬"
    },
    {
      id: 4,
      title: "Portuguese Vocabulary Builder",
      category: "vocabulary",
      language: "portuguese",
      type: "interactive",
      size: "Online",
      pages: null,
      downloads: 7890,
      rating: 4.6,
      duration: "Ilimitado",
      description: "Herramienta interactiva con más de 5000 palabras en portugués",
      level: "Principiante",
      featured: false,
      premium: false,
      thumbnail: "⚡"
    },
    {
      id: 5,
      title: "German Culture & Traditions",
      category: "culture",
      language: "german",
      type: "pdf",
      size: "6.7 MB",
      pages: 89,
      downloads: 4320,
      rating: 4.5,
      duration: null,
      description: "Exploración profunda de la cultura alemana, tradiciones y sociedad moderna",
      level: "Intermedio",
      featured: false,
      premium: false,
      thumbnail: "🏰"
    },
    {
      id: 6,
      title: "IELTS Speaking Practice",
      category: "exam-prep",
      language: "english",
      type: "video",
      size: "145 MB",
      pages: null,
      downloads: 9876,
      rating: 4.9,
      duration: "3h 30m",
      description: "Simulacros completos del examen oral IELTS con retroalimentación",
      level: "Avanzado",
      featured: true,
      premium: true,
      thumbnail: "🎯"
    },
    {
      id: 7,
      title: "French Kids Stories",
      category: "kids",
      language: "french",
      type: "audio",
      size: "67 MB",
      pages: null,
      downloads: 3456,
      rating: 4.8,
      duration: "1h 20m",
      description: "Cuentos infantiles en francés narrados por profesores nativos",
      level: "Principiante",
      featured: false,
      premium: false,
      thumbnail: "🧸"
    },
    {
      id: 8,
      title: "Italian Travel Phrases",
      category: "conversation",
      language: "italian",
      type: "pdf",
      size: "2.1 MB",
      pages: 45,
      downloads: 6543,
      rating: 4.4,
      duration: null,
      description: "Frases esenciales para viajar por Italia con pronunciación fonética",
      level: "Principiante",
      featured: false,
      premium: false,
      thumbnail: "✈️"
    }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesType = selectedType === 'all' || resource.type === selectedType
    const matchesLanguage = selectedLanguage === 'all' || resource.language === selectedLanguage
    return matchesSearch && matchesCategory && matchesType && matchesLanguage
  })

  const featuredResources = resources.filter(resource => resource.featured)

  const getTypeIcon = (type) => {
    const typeData = types.find(t => t.id === type)
    return typeData?.icon || FileText
  }

  const getTypeColor = (type) => {
    const colors = {
      pdf: 'text-red-600 bg-red-100',
      audio: 'text-blue-600 bg-blue-100',
      video: 'text-purple-600 bg-purple-100',
      interactive: 'text-green-600 bg-green-100'
    }
    return colors[type] || 'text-gray-600 bg-gray-100'
  }

  const getLanguageInfo = (languageId) => {
    return languages.find(lang => lang.id === languageId) || { name: languageId, flag: '🌐' }
  }

  const formatSize = (size) => {
    if (size === 'Online') return 'Online'
    return size
  }

  return (
    <div className="py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Biblioteca Digital
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Accede a nuestra extensa colección de recursos educativos. 
            PDFs, audios, videos y herramientas interactivas para complementar tu aprendizaje.
          </p>
        </div>

        {/* Featured Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.slice(0, 3).map(resource => {
              const langInfo = getLanguageInfo(resource.language)
              const TypeIcon = getTypeIcon(resource.type)
              
              return (
                <div key={resource.id} className="card hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  {resource.premium && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                      PREMIUM
                    </div>
                  )}
                  
                  <div className="card-body">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{resource.thumbnail}</div>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-2xl">{langInfo.flag}</span>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}>
                          <TypeIcon size={16} />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400 fill-current" size={12} />
                        <span>{resource.rating}</span>
                      </div>
                      <span>{resource.level}</span>
                      <div className="flex items-center gap-1">
                        <Download size={12} />
                        <span>{resource.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="btn btn-ghost btn-sm flex-1">
                        <Eye size={14} />
                        Vista previa
                      </button>
                      <button className="btn btn-primary btn-sm flex-1">
                        <Download size={14} />
                        {resource.premium ? 'Premium' : 'Gratis'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Filters */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="form-input-icon">
              <Search className="icon" size={16} />
              <input
                type="text"
                placeholder="Buscar recursos..."
                className="form-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-input"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>

            {/* Language Filter */}
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="form-input"
            >
              {languages.map(language => (
                <option key={language.id} value={language.id}>
                  {language.flag} {language.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 text-center">
            Mostrando {filteredResources.length} de {resources.length} recursos
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResources.map(resource => {
              const langInfo = getLanguageInfo(resource.language)
              const TypeIcon = getTypeIcon(resource.type)
              
              return (
                <div key={resource.id} className="card hover:shadow-lg transition-all duration-300">
                  <div className="card-body">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="text-3xl mb-2">{resource.thumbnail}</div>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(resource.type)}`}>
                          <TypeIcon size={20} />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-gray-900 truncate">{resource.title}</h3>
                            <span className="text-xl">{langInfo.flag}</span>
                            {resource.premium && (
                              <span className="badge badge-warning text-xs">Premium</span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-400 fill-current" size={12} />
                            <span className="font-medium">{resource.rating}</span>
                          </div>
                          <span className="badge badge-gray">{resource.level}</span>
                          <div className="flex items-center gap-1">
                            <Download size={12} />
                            <span>{resource.downloads.toLocaleString()}</span>
                          </div>
                          {resource.duration && (
                            <div className="flex items-center gap-1">
                              <Clock size={12} />
                              <span>{resource.duration}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            {formatSize(resource.size)}
                            {resource.pages && ` • ${resource.pages} páginas`}
                          </div>
                          
                          <div className="flex gap-2">
                            <button className="btn btn-ghost btn-sm">
                              <Eye size={14} />
                              Preview
                            </button>
                            <button className="btn btn-primary btn-sm">
                              <Download size={14} />
                              {resource.premium ? 'Premium' : 'Descargar'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No se encontraron recursos
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedType('all')
                setSelectedLanguage('all')
              }}
              className="btn btn-primary"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-primary text-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Accede a Recursos Premium
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Únete a nuestro plan premium y desbloquea acceso ilimitado a más de 1,000 recursos 
            exclusivos, sin anuncios y con descargas offline.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="btn btn-secondary text-primary-700">
              <Star size={16} />
              Probar Premium Gratis
            </button>
            <button className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700">
              Ver Precios
            </button>
          </div>
          <div className="mt-4 text-sm text-white/80">
            ✓ 7 días gratis • ✓ Cancela cuando quieras • ✓ Sin compromisos
          </div>
        </div>
      </div>
    </div>
  )
}

export default Library
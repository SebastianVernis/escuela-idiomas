import { useState } from 'react'
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Play, 
  CheckCircle,
  Filter,
  Search,
  Award,
  Target,
  Zap
} from 'lucide-react'

const Courses = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const languages = [
    { id: 'all', name: 'Todos los idiomas', flag: '🌐' },
    { id: 'english', name: 'Inglés', flag: '🇺🇸' },
    { id: 'french', name: 'Francés', flag: '🇫🇷' },
    { id: 'italian', name: 'Italiano', flag: '🇮🇹' },
    { id: 'portuguese', name: 'Portugués', flag: '🇧🇷' },
    { id: 'german', name: 'Alemán', flag: '🇩🇪' },
    { id: 'chinese', name: 'Chino', flag: '🇨🇳' }
  ]

  const levels = [
    { id: 'all', name: 'Todos los niveles' },
    { id: 'beginner', name: 'Principiante (A1-A2)' },
    { id: 'intermediate', name: 'Intermedio (B1-B2)' },
    { id: 'advanced', name: 'Avanzado (C1-C2)' }
  ]

  const courses = [
    {
      id: 1,
      title: "Inglés para Negocios",
      language: "english",
      level: "intermediate",
      duration: "12 semanas",
      students: 2450,
      rating: 4.9,
      price: 199,
      originalPrice: 299,
      description: "Domina el inglés empresarial con vocabulario específico y situaciones reales",
      instructor: "Sarah Johnson",
      features: [
        "Presentaciones efectivas",
        "Emails profesionales", 
        "Negociación internacional",
        "Videoconferencias",
        "Certificado LinkedIn"
      ],
      badge: "Más Popular",
      badgeColor: "success",
      image: "🏢"
    },
    {
      id: 2,
      title: "Inglés Conversacional Avanzado",
      language: "english",
      level: "advanced",
      duration: "16 semanas",
      students: 1890,
      rating: 4.8,
      price: 249,
      originalPrice: 349,
      description: "Perfecciona tu fluidez con debates, análisis crítico y expresión sofisticada",
      instructor: "Michael Brown",
      features: [
        "Debates estructurados",
        "Análisis de medios",
        "Expresiones idiomáticas",
        "Pronunciación nativa",
        "Preparación IELTS/TOEFL"
      ],
      badge: "Premium",
      badgeColor: "warning",
      image: "🎯"
    },
    {
      id: 3,
      title: "Francés desde Cero",
      language: "french",
      level: "beginner",
      duration: "10 semanas",
      students: 1250,
      rating: 4.7,
      price: 149,
      originalPrice: 199,
      description: "Aprende francés desde los fundamentos con enfoque comunicativo",
      instructor: "Marie Dubois",
      features: [
        "Pronunciación francesa",
        "Gramática básica",
        "Cultura francófona",
        "Conversaciones diarias",
        "Preparación DELF A1-A2"
      ],
      badge: "Nuevo",
      badgeColor: "primary",
      image: "🥖"
    },
    {
      id: 4,
      title: "Italiano para Viajeros",
      language: "italian",
      level: "beginner",
      duration: "8 semanas",
      students: 980,
      rating: 4.8,
      price: 129,
      originalPrice: 179,
      description: "Italiano práctico para disfrutar al máximo tus viajes a Italia",
      instructor: "Giuseppe Rossi",
      features: [
        "Vocabulario turístico",
        "Situaciones reales",
        "Cultura italiana",
        "Gastronomía y tradiciones",
        "Guía de supervivencia"
      ],
      badge: "Especializado",
      badgeColor: "gray",
      image: "🍝"
    },
    {
      id: 5,
      title: "Portugués Brasileño",
      language: "portuguese",
      level: "intermediate",
      duration: "12 semanas",
      students: 760,
      rating: 4.6,
      price: 179,
      originalPrice: 249,
      description: "Domina el portugués brasileño con profesores de São Paulo y Río",
      instructor: "Ana Silva",
      features: [
        "Acento carioca y paulista",
        "Música y cultura pop",
        "Negocios en Brasil",
        "Jerga cotidiana",
        "Preparación Celpe-Bras"
      ],
      badge: "Auténtico",
      badgeColor: "success",
      image: "🇧🇷"
    },
    {
      id: 6,
      title: "Alemán Técnico",
      language: "german",
      level: "advanced",
      duration: "14 semanas",
      students: 540,
      rating: 4.9,
      price: 289,
      originalPrice: 399,
      description: "Alemán especializado para profesionales de ingeniería y tecnología",
      instructor: "Klaus Weber",
      features: [
        "Vocabulario técnico",
        "Documentación profesional",
        "Presentaciones científicas",
        "Normas alemanas",
        "Networking profesional"
      ],
      badge: "Especializado",
      badgeColor: "warning",
      image: "⚙️"
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesLanguage && matchesLevel && matchesSearch
  })

  const getBadgeClass = (color) => {
    const classes = {
      success: 'badge-success',
      warning: 'badge-warning', 
      primary: 'badge-primary',
      gray: 'badge-gray'
    }
    return classes[color] || 'badge-gray'
  }

  const getLevelLabel = (level) => {
    const labels = {
      beginner: 'Principiante',
      intermediate: 'Intermedio', 
      advanced: 'Avanzado'
    }
    return labels[level] || level
  }

  const getLanguageInfo = (languageId) => {
    return languages.find(lang => lang.id === languageId) || { name: languageId, flag: '🌐' }
  }

  return (
    <div className="py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Catálogo de Cursos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra amplia variedad de cursos diseñados por expertos. 
            Desde principiante hasta avanzado, encuentra el curso perfecto para ti.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="form-input-icon flex-1 lg:max-w-md">
              <Search className="icon" size={16} />
              <input
                type="text"
                placeholder="Buscar cursos..."
                className="form-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Language Filter */}
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="form-input lg:w-48"
            >
              {languages.map(language => (
                <option key={language.id} value={language.id}>
                  {language.flag} {language.name}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="form-input lg:w-48"
            >
              {levels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>

            <div className="text-sm text-gray-500 whitespace-nowrap">
              {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCourses.map(course => {
              const langInfo = getLanguageInfo(course.language)
              
              return (
                <div key={course.id} className="card hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Course Header */}
                  <div className="card-header bg-gradient-to-r from-primary-50 to-primary-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{course.image}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{langInfo.flag}</span>
                            <span className={`badge ${getBadgeClass(course.level)}`}>
                              {getLevelLabel(course.level)}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                        </div>
                      </div>
                      
                      {course.badge && (
                        <span className={`badge ${getBadgeClass(course.badgeColor)}`}>
                          {course.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4">{course.description}</p>

                    {/* Course Stats */}
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span>{course.students.toLocaleString()} estudiantes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="font-medium text-gray-700">{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="card-body">
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen size={16} className="text-primary-600" />
                        <span className="font-semibold text-gray-900">Lo que aprenderás:</span>
                      </div>
                      <ul className="space-y-2">
                        {course.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {course.instructor.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>Instructor: <span className="font-medium">{course.instructor}</span></span>
                    </div>
                  </div>

                  {/* Course Footer */}
                  <div className="card-footer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-primary-600">${course.price}</span>
                          <span className="text-sm text-gray-500">USD</span>
                        </div>
                        {course.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="btn btn-ghost">
                          <Play size={16} />
                          Vista previa
                        </button>
                        <button className="btn btn-primary">
                          Inscribirse
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No se encontraron cursos
            </h3>
            <p className="text-gray-600 mb-6">
              Intenta ajustar tus filtros o términos de búsqueda
            </p>
            <button 
              onClick={() => {
                setSelectedLanguage('all')
                setSelectedLevel('all')
                setSearchTerm('')
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
            ¿No encuentras el curso perfecto?
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Contáctanos y crearemos un plan de estudios personalizado 
            adaptado a tus objetivos específicos
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="btn btn-secondary text-primary-700">
              <Target size={16} />
              Asesoramiento Personalizado
            </button>
            <button className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700">
              Hablar con un Experto
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
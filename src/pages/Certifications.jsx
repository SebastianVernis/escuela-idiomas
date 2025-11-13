import { 
  Award, 
  CheckCircle, 
  Clock, 
  Users, 
  Star,
  Globe,
  Target,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react'

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      name: "Cambridge English Certificate",
      provider: "Universidad de Cambridge",
      language: "Inglés",
      flag: "🇺🇸",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      duration: "3-4 meses preparación",
      examDuration: "3-4 horas",
      validity: "Sin vencimiento",
      recognition: "Mundial",
      price: 350,
      popularity: 98,
      description: "El certificado de inglés más reconocido mundialmente, aceptado por universidades y empresas en todo el planeta",
      benefits: [
        "Reconocimiento en 130+ países",
        "Válido para visas de estudio/trabajo",
        "Aceptado por 25,000+ organizaciones",
        "Preparación con profesores certificados",
        "Examen online disponible",
        "Resultados en 2-3 semanas"
      ],
      examFormat: [
        "Reading & Use of English",
        "Writing",
        "Listening", 
        "Speaking"
      ],
      color: "blue",
      featured: true
    },
    {
      id: 2,
      name: "DELF/DALF Français",
      provider: "Ministerio de Educación Francés",
      language: "Francés",
      flag: "🇫🇷",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      duration: "4-5 meses preparación",
      examDuration: "2-3 horas",
      validity: "Sin vencimiento",
      recognition: "Francia y países francófonos",
      price: 280,
      popularity: 85,
      description: "Diploma oficial del gobierno francés que certifica competencias en francés para estudiantes extranjeros",
      benefits: [
        "Validez permanente",
        "Reconocido por universidades francesas",
        "Requisito para residencia en Francia",
        "Preparación cultural incluida",
        "4 convocatorias anuales",
        "Certificado oficial del estado"
      ],
      examFormat: [
        "Comprensión oral",
        "Comprensión escrita",
        "Producción oral",
        "Producción escrita"
      ],
      color: "purple",
      featured: false
    },
    {
      id: 3,
      name: "CILS Italiano",
      provider: "Universidad para Extranjeros de Siena",
      language: "Italiano",
      flag: "🇮🇹",
      levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
      duration: "3-4 meses preparación",
      examDuration: "2-3 horas",
      validity: "Sin vencimiento",
      recognition: "Italia y Unión Europea",
      price: 320,
      popularity: 76,
      description: "Certificación oficial italiana reconocida por el Ministerio de Asuntos Exteriores de Italia",
      benefits: [
        "Reconocido oficialmente en Italia",
        "Válido para trabajo y estudios",
        "Exenciones universitarias",
        "Preparación con metodología italiana",
        "Resultados rápidos",
        "Soporte post-certificación"
      ],
      examFormat: [
        "Ascolto (Comprensión auditiva)",
        "Comprensione della lettura",
        "Analisi delle strutture",
        "Produzione scritta",
        "Produzione orale"
      ],
      color: "green",
      featured: false
    },
    {
      id: 4,
      name: "Celpe-Bras",
      provider: "Ministerio de Educación de Brasil",
      language: "Portugués",
      flag: "🇧🇷",
      levels: ["Intermedio", "Intermedio Superior", "Avanzado", "Avanzado Superior"],
      duration: "3-4 meses preparación",
      examDuration: "3 horas",
      validity: "Sin vencimiento",
      recognition: "Brasil y países lusófonos",
      price: 250,
      popularity: 82,
      description: "Único certificado de portugués brasileño reconocido oficialmente por el gobierno de Brasil",
      benefits: [
        "Única certificación oficial en Brasil",
        "Requisito para universidades brasileñas",
        "Válido para residencia permanente",
        "Enfoque comunicativo real",
        "Reconocimiento empresarial",
        "Preparación cultural brasileña"
      ],
      examFormat: [
        "Comprensión oral",
        "Comprensión escrita", 
        "Producción escrita integrada",
        "Conversación presencial"
      ],
      color: "orange",
      featured: true
    },
    {
      id: 5,
      name: "TestDaF Deutsch",
      provider: "Instituto TestDaF",
      language: "Alemán",
      flag: "🇩🇪",
      levels: ["B2", "C1"],
      duration: "4-6 meses preparación",
      examDuration: "3 horas 10 min",
      validity: "Sin vencimiento",
      recognition: "Alemania y países germanófonos",
      price: 410,
      popularity: 71,
      description: "Examen estandarizado de alemán como lengua extranjera para acceso a universidades alemanas",
      benefits: [
        "Acceso a universidades alemanas",
        "Reconocimiento académico internacional",
        "Válido para visas de estudio",
        "Preparación académica específica",
        "Modalidad online disponible",
        "Resultados digitales"
      ],
      examFormat: [
        "Leseverstehen (Comprensión lectora)",
        "Hörverstehen (Comprensión auditiva)",
        "Schriftlicher Ausdruck (Expresión escrita)",
        "Mündlicher Ausdruck (Expresión oral)"
      ],
      color: "red",
      featured: false
    },
    {
      id: 6,
      name: "HSK Chinese",
      provider: "Hanban/Confucius Institute",
      language: "Chino",
      flag: "🇨🇳",
      levels: ["HSK 1", "HSK 2", "HSK 3", "HSK 4", "HSK 5", "HSK 6"],
      duration: "4-8 meses preparación",
      examDuration: "1.5-2.5 horas",
      validity: "2 años",
      recognition: "China y mundial",
      price: 290,
      popularity: 88,
      description: "Examen internacional estandarizado de chino mandarín reconocido globalmente",
      benefits: [
        "Estándar internacional de chino",
        "Requisito para estudios en China",
        "Válido para becas gubernamentales",
        "Preparación con caracteres simplificados",
        "Reconocimiento empresarial global",
        "Puerta de entrada al mercado chino"
      ],
      examFormat: [
        "Comprensión auditiva",
        "Comprensión lectora",
        "Escritura (HSK 3+)",
        "Expresión oral (HSKK)"
      ],
      color: "yellow",
      featured: true
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: { 
        bg: 'bg-blue-50 border-blue-200', 
        text: 'text-blue-700',
        badge: 'bg-blue-100 text-blue-700',
        button: 'btn-primary'
      },
      purple: { 
        bg: 'bg-purple-50 border-purple-200', 
        text: 'text-purple-700',
        badge: 'bg-purple-100 text-purple-700',
        button: 'bg-purple-600 hover:bg-purple-700 text-white'
      },
      green: { 
        bg: 'bg-green-50 border-green-200', 
        text: 'text-green-700',
        badge: 'bg-green-100 text-green-700',
        button: 'bg-green-600 hover:bg-green-700 text-white'
      },
      orange: { 
        bg: 'bg-orange-50 border-orange-200', 
        text: 'text-orange-700',
        badge: 'bg-orange-100 text-orange-700',
        button: 'bg-orange-600 hover:orange-purple-700 text-white'
      },
      red: { 
        bg: 'bg-red-50 border-red-200', 
        text: 'text-red-700',
        badge: 'bg-red-100 text-red-700',
        button: 'bg-red-600 hover:bg-red-700 text-white'
      },
      yellow: { 
        bg: 'bg-yellow-50 border-yellow-200', 
        text: 'text-yellow-700',
        badge: 'bg-yellow-100 text-yellow-800',
        button: 'bg-yellow-600 hover:bg-yellow-700 text-white'
      }
    }
    return colors[color] || colors.blue
  }

  const getPopularityLabel = (popularity) => {
    if (popularity >= 90) return { label: 'Muy Popular', color: 'success' }
    if (popularity >= 80) return { label: 'Popular', color: 'primary' } 
    if (popularity >= 70) return { label: 'Conocido', color: 'warning' }
    return { label: 'Especializado', color: 'gray' }
  }

  const stats = [
    { icon: Award, number: '50,000+', label: 'Certificados Expedidos', color: 'text-yellow-600' },
    { icon: Users, number: '98%', label: 'Tasa de Aprobación', color: 'text-green-600' },
    { icon: Globe, number: '150+', label: 'Países Reconocidos', color: 'text-blue-600' },
    { icon: TrendingUp, number: '95%', label: 'Mejora Salarial', color: 'text-purple-600' }
  ]

  const whyCertify = [
    {
      icon: Target,
      title: 'Validación Oficial',
      description: 'Demuestra objetivamente tu dominio del idioma con estándares internacionales'
    },
    {
      icon: TrendingUp,
      title: 'Oportunidades Laborales',
      description: 'Incrementa tus posibilidades de conseguir mejores empleos y ascensos'
    },
    {
      icon: Globe,
      title: 'Movilidad Internacional',
      description: 'Accede a estudios y trabajo en el extranjero con certificaciones reconocidas'
    },
    {
      icon: Shield,
      title: 'Credibilidad Profesional',
      description: 'Construye confianza con empleadores y clientes internacionales'
    }
  ]

  return (
    <div className="py-8">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Certificaciones Oficiales
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Obtén certificados reconocidos internacionalmente que abran puertas a nuevas 
            oportunidades académicas y profesionales en todo el mundo.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={stat.color} size={32} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {certifications.map(cert => {
            const colorClasses = getColorClasses(cert.color)
            const popularityData = getPopularityLabel(cert.popularity)
            
            return (
              <div key={cert.id} className={`card ${colorClasses.bg} border-2 ${cert.featured ? 'ring-2 ring-primary-200 ring-offset-2' : ''} relative overflow-hidden`}>
                {cert.featured && (
                  <div className="absolute -top-1 -right-12 bg-primary-600 text-white px-12 py-1 text-xs font-bold rotate-45 transform">
                    RECOMENDADO
                  </div>
                )}
                
                <div className="card-body">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm">
                        {cert.flag}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{cert.name}</h3>
                        <p className="text-sm text-gray-600">{cert.provider}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`badge ${popularityData.color === 'success' ? 'badge-success' : popularityData.color === 'warning' ? 'badge-warning' : 'badge-primary'}`}>
                            {popularityData.label}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <TrendingUp size={12} />
                            <span>{cert.popularity}% popularidad</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">${cert.price}</div>
                      <div className="text-xs text-gray-500">USD</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed">{cert.description}</p>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={colorClasses.text} />
                      <span className="text-gray-600">{cert.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={16} className={colorClasses.text} />
                      <span className="text-gray-600">{cert.recognition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} className={colorClasses.text} />
                      <span className="text-gray-600">{cert.validity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={16} className={colorClasses.text} />
                      <span className="text-gray-600">{cert.examDuration}</span>
                    </div>
                  </div>

                  {/* Levels */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Niveles disponibles:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.levels.map(level => (
                        <span key={level} className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses.badge}`}>
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Beneficios destacados:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {cert.benefits.slice(0, 4).map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3">
                    <button className="btn btn-ghost flex-1">
                      <Globe size={16} />
                      Más info
                    </button>
                    <button className={`btn ${colorClasses.button || 'btn-primary'} flex-1`}>
                      <Award size={16} />
                      Inscribirse
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Why Certify Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué certificarte?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Las certificaciones oficiales son tu pasaporte a nuevas oportunidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyCertify.map((item, index) => (
              <div key={index} className="card text-center group hover:shadow-xl">
                <div className="card-body">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="text-primary-600" size={32} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-gradient-primary text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Proceso de Certificación</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { step: '1', title: 'Evaluación', desc: 'Evalúa tu nivel actual' },
              { step: '2', title: 'Preparación', desc: 'Curso intensivo personalizado' },
              { step: '3', title: 'Examen', desc: 'Presenta tu examen oficial' },
              { step: '4', title: 'Certificado', desc: 'Recibe tu certificación' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-secondary text-primary-700">
              <Target size={16} />
              Evaluación Gratuita
            </button>
            <button className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700">
              Asesoramiento Personal
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Certifications
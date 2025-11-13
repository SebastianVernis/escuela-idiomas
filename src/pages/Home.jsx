import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Award, 
  Users, 
  Globe, 
  Play, 
  CheckCircle, 
  Star,
  ArrowRight,
  Clock,
  Target,
  Zap,
  Shield,
  Headphones,
  Video
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Award,
      title: 'Certificaciones Oficiales',
      description: 'Obtén certificados reconocidos internacionalmente que validen tu nivel de idioma',
      color: 'text-yellow-600'
    },
    {
      icon: Users,
      title: 'Profesores Expertos',
      description: 'Aprende con profesores nativos certificados con amplia experiencia educativa',
      color: 'text-green-600'
    },
    {
      icon: Globe,
      title: 'Acceso Global 24/7',
      description: 'Estudia desde cualquier lugar y en cualquier momento con nuestra plataforma',
      color: 'text-blue-600'
    },
    {
      icon: Target,
      title: 'Metodología Personalizada',
      description: 'Cursos adaptados a tu nivel, objetivos y ritmo de aprendizaje específico',
      color: 'text-purple-600'
    },
    {
      icon: Zap,
      title: 'Aprendizaje Acelerado',
      description: 'Técnicas modernas y gamificación para maximizar tu progreso',
      color: 'text-orange-600'
    },
    {
      icon: Shield,
      title: 'Garantía de Calidad',
      description: 'Satisfacción garantizada o te devolvemos tu dinero en 30 días',
      color: 'text-red-600'
    }
  ]

  const stats = [
    { number: '50,000+', label: 'Estudiantes Activos', sublabel: 'En 150+ países' },
    { number: '98%', label: 'Tasa de Éxito', sublabel: 'Certificaciones aprobadas' },
    { number: '15+', label: 'Idiomas', sublabel: 'Disponibles' },
    { number: '4.9/5', label: 'Valoración', sublabel: 'De nuestros estudiantes' }
  ]

  const testimonials = [
    {
      name: 'María García',
      role: 'Marketing Manager',
      image: 'MG',
      rating: 5,
      text: 'Gracias a Idiomas Avanza conseguí mi certificación B2 de inglés. La metodología es excelente y los profesores muy profesionales. Ahora trabajo en una empresa multinacional.',
      course: 'Inglés Intermedio'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Software Developer',
      image: 'CR',
      rating: 5,
      text: 'El curso de francés me ayudó enormemente. En 6 meses pasé de principiante a nivel B1. Los recursos digitales y las clases interactivas son increíbles.',
      course: 'Francés Básico'
    },
    {
      name: 'Ana Silva',
      role: 'Estudiante Universitaria',
      image: 'AS',
      rating: 5,
      text: 'Necesitaba italiano para mi intercambio académico. La flexibilidad de horarios y la calidad del contenido superaron mis expectativas. ¡Altamente recomendado!',
      course: 'Italiano Conversacional'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Evalúa tu Nivel',
      description: 'Realiza nuestro test gratuito para conocer tu nivel actual',
      icon: Target
    },
    {
      number: '02', 
      title: 'Elige tu Curso',
      description: 'Selecciona el idioma y nivel que mejor se adapte a tus objetivos',
      icon: BookOpen
    },
    {
      number: '03',
      title: 'Aprende y Practica',
      description: 'Accede a lecciones interactivas, ejercicios y clases en vivo',
      icon: Video
    },
    {
      number: '04',
      title: 'Obtén tu Certificado',
      description: 'Completa tu curso y recibe tu certificación oficial',
      icon: Award
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Star className="text-orange-400" size={16} />
              <span className="text-sm font-medium">Valorado 4.9/5 por más de 50,000 estudiantes</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Domina Cualquier 
              <span className="text-orange-500"> Idioma</span>
              <br />Con Confianza
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Aprende idiomas con metodología moderna, profesores expertos y certificaciones 
              reconocidas internacionalmente. Tu futuro multilingüe comienza hoy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/portal" className="btn btn-secondary btn-lg text-primary-700">
                <Play size={20} />
                Comenzar Gratis
              </Link>
              <Link to="/cursos" className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary-700">
                <BookOpen size={20} />
                Ver Cursos
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Cancela cuando quieras</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Certificado incluido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Idiomas Avanza?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más de 10 años revolucionando el aprendizaje de idiomas con tecnología 
              de vanguardia y metodología probada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card card-body text-center group hover:shadow-xl">
                <div className={`w-16 h-16 ${feature.color.replace('text-', 'bg-').replace('-600', '-100')} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={feature.color} size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cómo Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un proceso simple y efectivo para comenzar tu viaje de aprendizaje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <step.icon className="text-white" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/portal" className="btn btn-primary btn-lg">
              Comenzar Mi Evaluación
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros estudiantes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Miles de personas ya han transformado sus carreras aprendiendo con nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card card-body">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-orange-500 fill-current" size={16} />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-xs text-primary-600">{testimonial.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para comenzar tu viaje multilingüe?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Únete a más de 50,000 estudiantes que ya están transformando 
            sus vidas aprendiendo nuevos idiomas
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/portal" className="btn btn-secondary btn-lg text-primary-700">
              Registrarse Gratis
              <ArrowRight size={20} />
            </Link>
            <Link to="/cursos" className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary-700">
              Explorar Cursos
            </Link>
          </div>

          <div className="text-white/80 text-sm">
            ✓ Prueba gratuita de 7 días  •  ✓ Sin tarjeta de crédito  •  ✓ Cancela cuando quieras
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
import { useState } from 'react'
import { 
  User, 
  Mail, 
  Lock, 
  BookOpen, 
  Award, 
  BarChart3,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Users,
  Clock,
  Shield
} from 'lucide-react'

const Portal = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    terms: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const features = [
    { icon: BookOpen, label: 'Cursos Interactivos', color: 'text-blue-600 bg-blue-100' },
    { icon: Award, label: 'Certificaciones', color: 'text-yellow-600 bg-yellow-100' },
    { icon: BarChart3, label: 'Seguimiento de Progreso', color: 'text-green-600 bg-green-100' },
    { icon: Users, label: 'Comunidad Global', color: 'text-purple-600 bg-purple-100' }
  ]

  const testimonials = [
    {
      name: 'María González',
      role: 'Marketing Manager',
      avatar: 'MG',
      rating: 5,
      text: 'Conseguí mi trabajo soñado después de certificarme en inglés. La plataforma es increíble.',
      course: 'Inglés B2',
      flag: '🇺🇸'
    },
    {
      name: 'Carlos Rodríguez', 
      role: 'Software Developer',
      avatar: 'CR',
      rating: 5,
      text: 'El francés me abrió puertas en Europa. Metodología excelente y profesores top.',
      course: 'Francés B1',
      flag: '🇫🇷'
    },
    {
      name: 'Ana Silva',
      role: 'Estudiante Universitaria',
      avatar: 'AS', 
      rating: 5,
      text: 'Flexible y efectivo. Pude estudiar desde casa y obtener mi certificado italiano.',
      course: 'Italiano A2',
      flag: '🇮🇹'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Estudiantes', sublabel: 'En 150+ países' },
    { number: '98%', label: 'Satisfacción', sublabel: 'Valoración promedio' },
    { number: '15+', label: 'Idiomas', sublabel: 'Disponibles' },
    { number: '24/7', label: 'Acceso', sublabel: 'Soporte incluido' }
  ]

  const benefits = [
    'Prueba gratuita de 7 días',
    'Cancela cuando quieras',
    'Profesores nativos certificados',
    'Clases en vivo ilimitadas',
    'Certificados oficiales incluidos',
    'Soporte técnico 24/7'
  ]

  const LoginForm = () => (
    <form className="space-y-6">
      <div className="form-group">
        <label className="form-label">Correo electrónico</label>
        <div className="form-input-icon">
          <Mail className="icon" size={20} />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label">Contraseña</label>
        <div className="form-input-icon">
          <Lock className="icon" size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="form-input pr-12"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
          <span className="text-sm text-gray-600">Recordarme</span>
        </label>
        <button type="button" className="text-sm text-primary-600 hover:text-primary-500">
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <button type="submit" className="btn btn-primary btn-lg w-full">
        <ArrowRight size={20} />
        Iniciar Sesión
      </button>

      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">o continúa con</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="btn btn-secondary">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button type="button" className="btn btn-secondary">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
      </div>
    </form>
  )

  const RegisterForm = () => (
    <form className="space-y-6">
      <div className="form-group">
        <label className="form-label">Nombre completo</label>
        <div className="form-input-icon">
          <User className="icon" size={20} />
          <input
            type="text"
            name="fullName"
            className="form-input"
            placeholder="Tu nombre completo"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Correo electrónico</label>
        <div className="form-input-icon">
          <Mail className="icon" size={20} />
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label">Contraseña</label>
        <div className="form-input-icon">
          <Lock className="icon" size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="form-input pr-12"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Mínimo 8 caracteres con al menos una mayúscula y un número
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Confirmar contraseña</label>
        <div className="form-input-icon">
          <Lock className="icon" size={20} />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            className="form-input pr-12"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label className="flex items-start gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            name="terms"
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mt-1" 
            checked={formData.terms}
            onChange={handleInputChange}
            required
          />
          <span className="text-sm text-gray-600 leading-relaxed">
            Acepto los{' '}
            <button type="button" className="text-primary-600 hover:text-primary-500 underline">
              términos y condiciones
            </button>
            {' '}y la{' '}
            <button type="button" className="text-primary-600 hover:text-primary-500 underline">
              política de privacidad
            </button>
          </span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-lg w-full">
        <ArrowRight size={20} />
        Crear Cuenta Gratis
      </button>

      <div className="text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">o regístrate con</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="btn btn-secondary">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google
        </button>
        <button type="button" className="btn btn-secondary">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>
      </div>
    </form>
  )

  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Column - Info */}
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {isLogin ? (
                  <>
                    Bienvenido
                    <br />
                    <span className="text-primary-600">de vuelta</span>
                  </>
                ) : (
                  <>
                    Comienza tu
                    <br />
                    <span className="text-primary-600">viaje multilingüe</span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {isLogin 
                  ? 'Continúa aprendiendo donde lo dejaste. Tu progreso te está esperando.'
                  : 'Únete a más de 50,000 estudiantes que ya están transformando sus vidas aprendiendo nuevos idiomas.'
                }
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${feature.color}`}>
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{feature.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{stat.number}</div>
                  <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.sublabel}</div>
                </div>
              ))}
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0" size={16} />
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="order-1 lg:order-2">
            <div className="card max-w-md mx-auto lg:mx-0">
              <div className="card-body">
                {/* Form Toggle */}
                <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 px-4 text-center font-medium text-sm rounded-md transition-all ${
                      isLogin 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 px-4 text-center font-medium text-sm rounded-md transition-all ${
                      !isLogin 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Registrarse
                  </button>
                </div>

                {/* Form */}
                {isLogin ? <LoginForm /> : <RegisterForm />}

                {/* Form Footer */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                    {' '}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-primary-600 hover:text-primary-500 font-medium"
                    >
                      {isLogin ? 'Regístrate gratis' : 'Inicia sesión'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="mt-24 py-16 bg-gray-50 rounded-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Historias de éxito reales
            </h2>
            <p className="text-lg text-gray-600">
              Descubre cómo nuestros estudiantes han transformado sus vidas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-lg">{testimonial.flag}</span>
                        <span className="text-xs text-primary-600 font-medium">{testimonial.course}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="mt-16 text-center">
          <p className="text-gray-500 mb-8">Confiado por estudiantes de todo el mundo</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <Globe size={24} />
              <span className="font-medium">150+ países</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={24} />
              <span className="font-medium">Certificado SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={24} />
              <span className="font-medium">Certificaciones oficiales</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={24} />
              <span className="font-medium">Soporte 24/7</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Portal
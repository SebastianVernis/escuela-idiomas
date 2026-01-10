export const LANGUAGES = [
  { id: 'ingles', name: 'Inglés', flag: '🇬🇧', color: '#2563eb' },
  { id: 'frances', name: 'Francés', flag: '🇫🇷', color: '#3b82f6' },
  { id: 'italiano', name: 'Italiano', flag: '🇮🇹', color: '#10b981' },
  { id: 'aleman', name: 'Alemán', flag: '🇩🇪', color: '#f59e0b' },
  { id: 'portugues', name: 'Portugués', flag: '🇵🇹', color: '#8b5cf6' },
]

export const COURSE_LEVELS = [
  { id: 'basico', name: 'Básico', description: 'A1-A2' },
  { id: 'intermedio', name: 'Intermedio', description: 'B1-B2' },
  { id: 'avanzado', name: 'Avanzado', description: 'C1-C2' },
]

export const COURSE_FEATURES = [
  'Clases en vivo con profesores nativos',
  'Material didáctico incluido',
  'Acceso a plataforma digital 24/7',
  'Certificación internacional',
  'Grupos reducidos (máx. 10 personas)',
  'Soporte personalizado',
]

export const PRICING_TIERS = [
  {
    id: 'basico',
    name: 'Básico',
    price: 15000,
    duration: 'mes',
    features: [
      '4 clases mensuales',
      'Acceso a biblioteca digital',
      'Material descargable',
      'Certificado de participación',
    ],
  },
  {
    id: 'estandar',
    name: 'Estándar',
    price: 25000,
    duration: 'mes',
    features: [
      '8 clases mensuales',
      'Acceso a biblioteca digital',
      'Material descargable',
      'Tutorías personalizadas',
      'Certificado oficial',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 40000,
    duration: 'mes',
    features: [
      '12 clases mensuales',
      'Acceso a biblioteca digital',
      'Material descargable',
      'Tutorías ilimitadas',
      'Certificado internacional',
      'Conversaciones con nativos',
    ],
  },
]

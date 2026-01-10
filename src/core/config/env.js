export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,
}

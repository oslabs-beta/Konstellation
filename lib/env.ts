export const env = {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  url: process.env.BASE_URL || 'http://localhost',
  port: process.env.PORT || '3000'
}

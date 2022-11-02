import * as dotenv from 'dotenv'
dotenv.config()

console.log(process.env) // remove this after you've confirmed it is working

export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
}

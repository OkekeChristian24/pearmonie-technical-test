import dotenv from 'dotenv'
dotenv.config()
export const SERVICE_URL = process.env.SERVICE_URL
export const WHITELIST_URLS = process.env.ALLOWED_ORIGINS?.split(',') || []

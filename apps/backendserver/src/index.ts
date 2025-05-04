import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import recommendRoutes from './routes/recommend.routes'
import { WHITELIST_URLS } from './config'

const app = express()
const port = 5000

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)

    if (WHITELIST_URLS.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())

app.use(authRoutes)
app.use(userRoutes)
app.use(recommendRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

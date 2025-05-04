import { Router } from 'express'
import AuthController from '../controllers/authController'

const authRoutes = Router()
const authController = new AuthController()

authRoutes.get('/', (req, res) => {
  res.status(200).send('Success')
})
authRoutes.post('/register', authController.registerUser)
authRoutes.get('/getuserIdsignup', authController.getUserIdSignup)
authRoutes.get('/getuserIdsignin', authController.getUserIdSignin)
authRoutes.post('/login', authController.loginUser)

export default authRoutes

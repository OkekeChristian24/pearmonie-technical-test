import { Router } from 'express'
import UserController from '../controllers/userController'

const userRoutes = Router()
const userController = new UserController()

userRoutes.get('/users/getuserIdsignup', userController.getUserById)
userRoutes.get('/users/getuserIdsignin', userController.getUserById)

export default userRoutes

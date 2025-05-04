import { Router } from 'express'
import RecommendController from '../controllers/recommendController'

const recommendRoutes = Router()
const recommendController = new RecommendController()

recommendRoutes.post('/addtomylist', recommendController.addToList)
recommendRoutes.post('/ratingimplicit', recommendController.rateImplicit)
recommendRoutes.post('/ratingexplicit', recommendController.rateExplicit)

recommendRoutes.get('/getcontentre', recommendController.contentRecommend)
recommendRoutes.get('/gettrending', recommendController.getTrending)

export default recommendRoutes

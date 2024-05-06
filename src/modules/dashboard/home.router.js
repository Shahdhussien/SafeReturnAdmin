import express from 'express'
import { home, search} from './home.controller.js'
const homeRouter = express.Router()


homeRouter.get('/home',home)
homeRouter.post('/search',search)


export default homeRouter
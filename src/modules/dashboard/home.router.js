import express from 'express'
import { home, model } from './home.controller.js'
const homeRouter = express.Router()


homeRouter.get('/home',home)
homeRouter.get('/model/:id',model)

export default homeRouter